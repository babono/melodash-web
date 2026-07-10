const fs = require('fs');
const path = require('path');

const srcDir = '/Users/babono/Dev/melodash-web/Melodash Marketing Website';
const publicDir = '/Users/babono/Dev/melodash-web/public';

// Helper to copy directory contents
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// 1. Copy Fonts
console.log('Copying fonts...');
copyDirSync(path.join(srcDir, 'fonts'), path.join(publicDir, 'fonts'));

// 2. Copy Assets
console.log('Copying assets...');
copyDirSync(path.join(srcDir, 'assets'), path.join(publicDir, 'assets'));

// 3. Decode base64 hero image
console.log('Decoding hero image from state JSON...');
const statePath = path.join(srcDir, '.image-slots.state.json');
if (fs.existsSync(statePath)) {
  try {
    const rawData = fs.readFileSync(statePath, 'utf8');
    const data = JSON.parse(rawData);
    if (data['hero-shot'] && data['hero-shot'].u) {
      const base64Data = data['hero-shot'].u.replace(/^data:image\/webp;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const destPath = path.join(publicDir, 'assets', 'hero-shot.webp');
      fs.writeFileSync(destPath, buffer);
      console.log(`Decoded hero-shot base64 to: ${destPath}`);
    } else {
      console.warn('Could not find hero-shot image in state JSON');
    }
  } catch (e) {
    console.error('Error parsing state JSON or writing hero-shot:', e);
  }
} else {
  console.warn('.image-slots.state.json not found');
}

// 4. Copy screenshots from uploads and screenshots folders
console.log('Copying screenshots...');
const uploadsDir = path.join(srcDir, 'uploads');
if (fs.existsSync(uploadsDir)) {
  const uploads = fs.readdirSync(uploadsDir);
  // Sort or match files
  const image1 = uploads.find(f => f.includes('12.45.15'));
  const image2 = uploads.find(f => f.includes('13.39.29'));

  if (image1) {
    fs.copyFileSync(path.join(uploadsDir, image1), path.join(publicDir, 'assets', 'shot-1.jpg'));
    console.log(`Copied: ${image1} -> assets/shot-1.jpg`);
  }
  if (image2) {
    fs.copyFileSync(path.join(uploadsDir, image2), path.join(publicDir, 'assets', 'shot-2.jpg'));
    console.log(`Copied: ${image2} -> assets/shot-2.jpg`);
  }
}

const screenshotsDir = path.join(srcDir, 'screenshots');
const techPngPath = path.join(screenshotsDir, 'tech.png');
if (fs.existsSync(techPngPath)) {
  fs.copyFileSync(techPngPath, path.join(publicDir, 'assets', 'shot-3.png'));
  console.log('Copied tech.png -> assets/shot-3.png');
}

console.log('Static asset setup completed successfully!');
