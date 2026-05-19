const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const tarotDir = path.join('D:', 'claudecode demo', 'Tarot', 'public', 'tarot');
const tempDir = path.join('D:', 'claudecode demo', 'Tarot', 'public', 'tarot_temp');

async function compressImages() {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const files = fs.readdirSync(tarotDir).filter(f =>
    f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
  );

  console.log(`Found ${files.length} images to compress`);

  for (const file of files) {
    const inputPath = path.join(tarotDir, file);
    const tempPath = path.join(tempDir, file);

    try {
      await sharp(inputPath)
        .resize(300, 450, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(tempPath);

      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, inputPath);

      const stats = fs.statSync(inputPath);
      console.log(`Compressed: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error compressing ${file}:`, err.message);
    }
  }

  fs.rmdirSync(tempDir, { recursive: true });
  console.log('Done!');
}

compressImages();