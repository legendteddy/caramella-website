const fs = require('fs');
const path = require('path');

const directoryPath = process.argv[2] || '.';

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (file.endsWith('.html')) {
                        results.push(file);
                    }
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

const genericLinkText = ['click here', 'learn more', 'read more', 'view all', 'here', 'more info', 'details'];

walk(directoryPath, function (err, results) {
    if (err) throw err;
    let issuesFound = false;

    results.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const filename = path.basename(file);
        let fileHasIssues = false;

        // Very basic regex parsing for <img> tags
        const imgRegex = /<img[^>]+>/g;
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
            const imgTag = match[0];
            if (!imgTag.includes('width=') || !imgTag.includes('height=')) {
                if (!fileHasIssues) { console.log(`\n--- ${filename} ---`); fileHasIssues = true; issuesFound = true; }
                console.log(`Missing width/height: ${imgTag}`);
            }
        }

        // Very basic regex parsing for <a> tags
        const aRegex = /<a[^>]*>(.*?)<\/a>/g;
        while ((match = aRegex.exec(content)) !== null) {
            const aTag = match[0];
            let innerText = match[1].replace(/<[^>]+>/g, '').trim().toLowerCase();

            // Check for generic text without aria-label
            if (genericLinkText.includes(innerText) && !aTag.includes('aria-label=')) {
                if (!fileHasIssues) { console.log(`\n--- ${filename} ---`); fileHasIssues = true; issuesFound = true; }
                console.log(`Generic link without aria-label: ${aTag}`);
            }

            // Check for "View All..." or similar patterns
            if (innerText.startsWith('view all') && !aTag.includes('aria-label=')) {
                if (!fileHasIssues) { console.log(`\n--- ${filename} ---`); fileHasIssues = true; issuesFound = true; }
                console.log(`Potentially generic 'view all' link without aria-label: ${aTag}`);
            }
        }
    });

    if (!issuesFound) {
        console.log('No issues found!');
    }
});
