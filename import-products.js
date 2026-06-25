const fs = require('fs');

const path = require('path');

// Read the downloaded CSV content from the markdown file generated earlier
const filePath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\dfe92b26-b815-4967-8ee1-b957d927571c\\.system_generated\\steps\\172\\content.md';
let data = fs.readFileSync(filePath, 'utf8');

// The markdown file starts with metadata. Let's find the start of the CSV data.
const csvStartIndex = data.indexOf('S No,Product Name');
if (csvStartIndex > -1) {
  data = data.substring(csvStartIndex);
}

const rows = [];
let currentRow = [];
let currentCell = '';
let inQuotes = false;

for (let i = 0; i < data.length; i++) {
  const char = data[i];
  const nextChar = data[i + 1];

  if (char === '"') {
    if (inQuotes && nextChar === '"') {
      currentCell += '"';
      i++; // Skip escaped quote
    } else {
      inQuotes = !inQuotes;
    }
  } else if (char === ',' && !inQuotes) {
    currentRow.push(currentCell.trim());
    currentCell = '';
  } else if ((char === '\n' || char === '\r') && !inQuotes) {
    if (char === '\r' && nextChar === '\n') i++;
    currentRow.push(currentCell.trim());
    if (currentRow.join('').trim() !== '') {
      rows.push(currentRow);
    }
    currentRow = [];
    currentCell = '';
  } else {
    currentCell += char;
  }
}
if (currentCell) currentRow.push(currentCell.trim());
if (currentRow.length > 0 && currentRow.join('').trim() !== '') rows.push(currentRow);

const products = [];

// Skip header row
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  if (!row || row.length < 2 || !row[1]) continue;

  const name = row[1];
  const category = row[2] || '';
  const availableSizesStr = row[3] || '';
  let packSizes = [];
  if (availableSizesStr) {
    packSizes = availableSizesStr.split(',').map(s => s.trim()).filter(s => s);
  }
  const description = row[5] || '';
  const nutrition = row[6] || '';
  const ingredients = row[9] || '';
  const benefitsStr = row[10] || '';
  const shelfLife = row[12] || '';

  // Generate a slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  let image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png';
  if (category.toLowerCase().includes('pickle')) image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png';
  else if (category.toLowerCase().includes('millet')) image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png';
  else if (category.toLowerCase().includes('snack') || category.toLowerCase().includes('appalam')) image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png';
  else if (category.toLowerCase().includes('breakfast')) image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Breakfast-Products_.png';
  else if (category.toLowerCase().includes('jam')) image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png';

  let benefitsArray = [];
  if (benefitsStr) {
    benefitsArray = benefitsStr.split('•').map(b => b.trim()).filter(b => b);
  }

  products.push({
    id: i,
    name,
    slug,
    category,
    price: "₹0.00",
    isBulkOnly: false,
    images: [image],
    packSizes,
    description,
    ingredients,
    nutritionalInfo: nutrition,
    benefits: benefitsArray,
    shelfLife,
    certifications: ["FSSAI Certified", "100% Natural", "Export Quality"]
  });
}

const fileContent = `export const products = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync('./src/data/productData.js', fileContent);
console.log(`Successfully generated productData.js with ${products.length} products!`);
