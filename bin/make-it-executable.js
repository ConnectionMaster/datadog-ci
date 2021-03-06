const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const ROOT = path.join(__dirname, '../');
const scriptPaths = require(path.join(ROOT, './package.json')).bin;

const INSERT = '#!/usr/bin/env node';

// Loop through all the bin we have in the package.json
Object.values(scriptPaths).forEach(async script => {
  const scriptPath = path.join(ROOT, script);
  const content = await promisify(fs.readFile)(scriptPath, 'utf8');
  if (!content.startsWith(INSERT)) {
    // Prepend it with the shebang config.
    await promisify(fs.writeFile)(scriptPath, `${INSERT}\n${content}`);
  }
  // Make it executable.
  await promisify(fs.chmod)(scriptPath, '755');
});
