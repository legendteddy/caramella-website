const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function walk(dir, acc) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === '.git' || e.name === 'node_modules') continue;
            walk(full, acc);
        } else if (e.isFile() && e.name.endsWith('.html')) {
            acc.push(full);
        }
    }
}

const files = [];
walk(root, files);

const issues = [];

function add(file, line, msg) {
    issues.push({ file: path.relative(root, file).replace(/\\/g, '/'), line, msg });
}

for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split(/\r?\n/);

    lines.forEach((ln, idx) => {
        const n = idx + 1;
        if (ln.includes('**')) add(file, n, 'Possible visible markdown token "**"');
        if (/\?\s*<\/a>/.test(ln)) add(file, n, 'Anchor text ends with "?" (likely placeholder glyph issue)');
        if (ln.includes('\\&amp;')) add(file, n, 'Found escaped ampersand "\\&amp;"');
        if (ln.includes('â€™') || ln.includes('â€“') || ln.includes('â€”') || ln.includes('Ã') || ln.includes('\uFFFD') || ln.includes('&#226;') || ln.includes('&#195;')) {
            add(file, n, 'Potential mojibake artifact');
        }
    });

    if (text.includes('<nav') && text.includes('class="nav-links"')) {
        const activeCount = (text.match(/class="[^"]*nav-active[^"]*"/g) || []).length;
        if (activeCount > 1) add(file, 1, `Multiple nav-active links detected (${activeCount})`);
    }
}

if (issues.length > 0) {
    console.log('## visual_issues');
    for (const i of issues) {
        console.log(`${i.file}:${i.line}: ${i.msg}`);
    }
    process.exit(1);
}

console.log('OK: visual lint passed');
