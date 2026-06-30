const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'products_new.csv');
let data = fs.readFileSync(filePath, 'utf8');

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

const categoryMap = {
  'Edible Oil': 'Edible Oils',
  'Non edible oil': 'Edible Oils',
  'Edible': 'Edible Oils',
  'Breakfast products': 'Breakfast',
  'Pickle': 'Pickles',
  'Jam': 'Jams',
  'Millet': 'Millets',
  'Appalam': 'Snacks',
  'Vadagam': 'Snacks',
  'Pulse': 'Pulses',
  'Tamarind': 'Spices',
  'Kokum': 'Spices',
  'vinegar': 'Condiments',
  'Asafoetida': 'Spices',
  'Ginger garlic paste': 'Condiments',
  'Coffee': 'Beverages',
  'Tea': 'Beverages',
  'Chukkukapi': 'Beverages',
  'Nannari sarbath': 'Beverages',
  'Nellika kanthari': 'Beverages',
  'Grocery': 'Grocery',
  'Coconut  (copra / dried)': 'Grocery',
  'Coconut ( copra / dried)': 'Grocery',
  'Rice flakes': 'Breakfast',
  'READY TO COOK': 'Breakfast',
  'Jaggery': 'Grocery',
  'Rice': 'Rice'
};

const products = [];

// Skip header row
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  if (!row || row.length < 2 || !row[1]) continue;

  const name = row[1];
  const originalCategory = row[2] || '';
  const availableSizesStr = row[3] || '';
  let packSizes = [];
  if (availableSizesStr) {
    packSizes = availableSizesStr.split(',').map(s => s.trim()).filter(s => s);
  }
  const description = row[4] || ''; 
  const ingredients = row[5] || '';
  const nutrition = row[6] || '';
  const origin = row[7] || '';
  const storage = row[8] || '';
  const benefitsStr = row[9] || ''; 
  const manufacturer = row[10] || '';
  const primaryPackSize = row[11] || '';
  const fssai = row[12] || '';
  const sku = row[13] || '';

  // Category mapping
  let category = categoryMap[originalCategory] || 'Other Products';

  // Generate a slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  let image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Edible-Oils.png';
  if (category === 'Jams & Pickles') image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Jams-Pickles_.png';
  else if (category === 'Millets & Pulses') image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Millets_.png';
  else if (category === 'Breakfast & Snacks') image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png';
  else if (category === 'Beverages') image = 'https://www.pavithram.online/wp-content/uploads/2025/10/Cochin-Snacks.png'; 
  else if (category === 'Spices & Condiments') image = 'https://www.pavithram.online/wp-content/uploads/2025/09/Chicken-Masala-160g.jpg';

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
    origin,
    storage,
    manufacturer,
    primaryPackSize,
    fssai,
    sku,
    certifications: ["FSSAI Certified", "100% Natural", "Export Quality"]
  });
}

const fileContent = `export const products = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'productData.js'), fileContent);
console.log(`Successfully generated productData.js with ${products.length} products!`);
