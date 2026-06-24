const fs = require('fs');
const path = require('path');
const { products, categories } = require('../src/data/productData.js');

const rootDir = path.join(__dirname, '../public/images/products/Pavithram Mockups');

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const allImagePaths = getAllFiles(rootDir);

// Helper to normalize string for comparison
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Helper to compute match score
function getMatchScore(productName, fileName) {
  const pWords = productName.toLowerCase().split(/[^a-z0-9]+/);
  const fWords = fileName.toLowerCase().replace(/\.[^/.]+$/, "").split(/[^a-z0-9]+/);
  
  let score = 0;
  for (const pw of pWords) {
    if (pw.length > 2 && fileName.toLowerCase().includes(pw)) {
      score += 1;
    }
  }
  for (const fw of fWords) {
    if (fw.length > 2 && productName.toLowerCase().includes(fw)) {
      score += 1;
    }
  }
  return score;
}

const updatedProducts = products.map(product => {
  let bestMatch = null;
  let bestScore = 0;

  for (const imgPath of allImagePaths) {
    const fileName = path.basename(imgPath);
    const score = getMatchScore(product.name, fileName);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = imgPath;
    }
  }

  if (bestMatch && bestScore > 0) {
    // Convert absolute path to relative public path
    const relativePath = bestMatch.split('public')[1].replace(/\\/g, '/');
    product.image = relativePath;
    product.images = [relativePath, relativePath, relativePath];
  }
  
  return product;
});

const fileContent = `export const categories = ${JSON.stringify(categories, null, 2)};\n\nexport const products = ${JSON.stringify(updatedProducts, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, '../src/data/productData.js'), fileContent);
console.log('Successfully mapped images to products.');
