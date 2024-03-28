const xlsx = require('xlsx');
const axios = require('axios');
const readline = require('readline');

const workbook = xlsx.readFile('SaleData.xlsx');
const sheetName = workbook.SheetNames[0]; 
const sheet = workbook.Sheets[sheetName];
const excelData = xlsx.utils.sheet_to_json(sheet);


// const apiKey = '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'; 

const dataString = JSON.stringify(excelData);

const tags = ["Order Date", "Region", "Manager", "SalesMan", "Item", "Units", "Unit_price", "Sale_amt"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Available tags:");
tags.forEach((tag, index) => console.log(`${index + 1}. ${tag}`));

rl.question('Choose a tag (by number or name): ', (tagInput) => {
    let selectedTag;
    const tagIndex = parseInt(tagInput) - 1;

    if (!isNaN(tagIndex) && tagIndex >= 0 && tagIndex < tags.length) {
        selectedTag = tags[tagIndex];
    } else if (tags.includes(tagInput)) {
        selectedTag = tagInput;
    }

    if (selectedTag) {
        rl.question(`Ask a question about ${selectedTag}: `, (userQuestion) => {
            const messages = [{
                role: 'system',
                content: 'You are a helpful assistant.'
            }, {
                role: 'user',
                content: `Here is some data from the Excel file:\n${dataString}\n${userQuestion}`
            }];

            // axios.post('https://api.openai.com/v1/chat/completions', 
            // {
            //     model: "gpt-3.5-turbo-0613",
            //     messages: messages,
            //     max_tokens: 100
            // }, {
            //     headers: {
            //         'Authorization': `Bearer ${apiKey}`,
            //         'Content-Type': 'application/json'
            //     }
            // }).then(response => {
            //     if (response.data.choices && response.data.choices.length > 0) {
            //         console.log(response.data.choices[0].message.content.trim());
            //     } else {
            //         console.error('No response from the API');
            //     }
            // }).catch(error => {
            //     console.error('Error:', error.response ? error.response.data : error);
            // });

            rl.close();
        });
    } else {
        console.log('Invalid tag selection. Please try again.');
        rl.close();
    }
});
