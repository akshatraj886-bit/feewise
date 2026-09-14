const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const replacements = {
    '1st Year (AY 2026-27)': '1st Year (AY 2025-26)',
    '2nd Year (AY 2026-27)': '2nd Year (AY 2024-25)',
    '3rd Year (AY 2026-27)': '3rd Year (AY 2023-24)',
    '4th Year (AY 2026-27)': '4th Year (AY 2022-23)',
    'M.Tech 1st Year (AY 2026-27)': 'M.Tech 1st Year (AY 2025-26)'
  };
  
  let changed = false;
  for (const [search, replace] of Object.entries(replacements)) {
    if (content.includes(search)) {
      content = content.split(search).join(replace);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function walkSync(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!['node_modules', '.next', '.git', 'scratch'].includes(file)) {
        walkSync(filePath, callback);
      }
    } else {
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        callback(filePath);
      }
    }
  }
}

const dir = 'c:/Users/aksha/Desktop/feewise';
walkSync(dir, replaceInFile);
console.log('Done replacing academic year labels.');
