const fs = require('fs');
const path = require('path');

const cwd = 'C:/Users/thoma/Documents/Caramella Website';

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            // Skip node_modules or .git
            if (file !== 'node_modules' && file !== '.git' && file !== '.gemini' && file !== '.vscode') {
                arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const htmlFiles = getAllHtmlFiles(cwd);

let totalFiles = 0;
let totalSchemas = 0;
let errorCount = 0;

console.log('--- Initiating Defense-in-Depth Schema Audit ---');

htmlFiles.forEach(fullPath => {
    const relativePath = path.relative(cwd, fullPath);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Non-greedy match for script tags
    const regex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/g;
    let match;
    let fileHasSchema = false;

    while ((match = regex.exec(content)) !== null) {
        fileHasSchema = true;
        totalSchemas++;
        const rawJson = match[1].trim();

        if (!rawJson) {
            console.log(`[WARNING] Empty Schema block in: ${relativePath}`);
            errorCount++;
            continue;
        }

        try {
            JSON.parse(rawJson);
        } catch (e) {
            console.error(`\n[ERROR] Invalid JSON in ${relativePath}`);
            console.error(`Reason: ${e.message}`);
            errorCount++;
        }
    }

    if (fileHasSchema) totalFiles++;
});

console.log('\n--- Audit Complete ---');
console.log(`Files with Schema: ${totalFiles}/${htmlFiles.length}`);
console.log(`Total Schema Blocks: ${totalSchemas}`);
console.log(`Errors Found: ${errorCount}`);

if (errorCount > 0) {
    process.exit(1);
}
