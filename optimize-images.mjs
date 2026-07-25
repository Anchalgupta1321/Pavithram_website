import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function optimize() {
  const images = [
    { in: 'public/images/Hero Banner.jpg', out: 'public/images/hero-banner-opt.webp' },
    { in: 'public/images/Banner2.jpg', out: 'public/images/banner2-opt.webp' }
  ];

  for (const img of images) {
    try {
      console.log(`Optimizing ${img.in}...`);
      await sharp(img.in)
        .resize(1920, null, { withoutEnlargement: true }) // Max width 1920px
        .webp({ quality: 80, effort: 6 }) // Convert to webp with good compression
        .toFile(img.out);
      
      const stat = await fs.stat(img.out);
      console.log(`Successfully created ${img.out} - ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error(`Failed to optimize ${img.in}:`, err);
    }
  }
}

optimize();
