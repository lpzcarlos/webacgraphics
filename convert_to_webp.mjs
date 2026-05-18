import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicMediaDir = path.join(__dirname, 'public', 'media');

async function convertDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      await convertDirectory(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const baseName = path.basename(entry.name, ext);
        const newPath = path.join(dirPath, `${baseName}.webp`);
        
        try {
          console.log(`Converting: ${fullPath} -> ${newPath}`);
          await sharp(fullPath).webp({ quality: 80 }).toFile(newPath);
          fs.unlinkSync(fullPath); // Delete original
        } catch (err) {
          console.error(`Failed to convert ${fullPath}:`, err);
        }
      }
    }
  }
}

async function updateJsonFiles() {
  const jsonFiles = [
    path.join(__dirname, 'src', 'data', 'works.json'),
    path.join(__dirname, 'src', 'data', 'artists.json'),
    path.join(__dirname, 'src', 'data', 'clients.json'),
  ];

  for (const file of jsonFiles) {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf-8');
      // Replace .jpg, .jpeg, .png with .webp
      content = content.replace(/\.jpg/gi, '.webp')
                       .replace(/\.jpeg/gi, '.webp')
                       .replace(/\.png/gi, '.webp');
      fs.writeFileSync(file, content);
      console.log(`Updated JSON: ${file}`);
    }
  }
}

async function main() {
  console.log('Starting WebP conversion...');
  await convertDirectory(publicMediaDir);
  console.log('Updating JSON files...');
  await updateJsonFiles();
  console.log('Done!');
}

main();
