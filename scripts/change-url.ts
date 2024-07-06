import fs from 'fs';
import path from 'path';
import { program } from 'commander';

program
    .requiredOption('-n, --name <name>', 'Name of the property')
    .requiredOption('-u, --url <url>', 'URL to set for the property')
    .parse(process.argv);

const options = program.opts();
const { name, url } = options;

const dataFilePath = path.join(__dirname, '../src/data.ts');

// Read the TypeScript file
let tsContent = fs.readFileSync(dataFilePath, 'utf8');

let lines = tsContent.split('\n');

// Find the object definition and replace the value for the specified name
let found = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().replace(/\'/g, '').startsWith(`${name}:`)) {
        lines[i] = `    '${name}': '${url}',`;
        found = true;
        break;
    }
}

// If the property was not found, add it
if (!found) {
    console.error(`"${name}" is not an option`);
    process.exit(1);
}

// Join the lines back into a single string
tsContent = lines.join('\n');

// Write the updated content back to the TypeScript file
fs.writeFileSync(dataFilePath, tsContent, 'utf8');

console.log(`Updated ${name} to ${url} in ${dataFilePath}`);
