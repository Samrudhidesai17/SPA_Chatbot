const xlsx = require('xlsx');

// Load the Excel file
const workbook = xlsx.readFile('SaleData.xlsx');

// Get the first sheet in the workbook
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to CSV
const csv = xlsx.utils.sheet_to_csv(worksheet);

// Save the CSV to a file
const fs = require('fs');
fs.writeFileSync('Documents.csv', csv);

console.log('Excel file has been converted to CSV successfully.');
