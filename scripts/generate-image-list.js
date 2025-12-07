import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the collage folder
const collageDir = path.join(__dirname, '../public/collage');

// Read all JPG files
const files = fs.readdirSync(collageDir)
  .filter(file => file.endsWith('.JPG') || file.endsWith('.jpg'))
  .sort()
  .map(file => `/collage/${file}`);

// Write to a JSON file
const outputPath = path.join(__dirname, '../src/data/images.json');
fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));

console.log(`✅ Generated image list: ${files.length} images found`);
