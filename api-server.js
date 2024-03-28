const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});
const apiKey = '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';
const tags = ["Date", "Service", "Price", "Duration", "ClientName", "Therapist"];

// Rest of your server code...

function isDatabaseQuestion(question) {
    const databaseKeywords = ['date', 'service', 'price', 'duration', 'client', 'therapist'];
    return databaseKeywords.some(keyword => question.toLowerCase().includes(keyword));
}

async function handleGeneralQuestion(req, res, userQuestion) {
    try {
        // const openaiResponse = await axios.post(
        //     'https://api.openai.com/v1/chat/completions',
        //     {
        //         model: 'gpt-3.5-turbo',
        //         messages: [
        //             {
        //                 role: 'system',
        //                 content: 'You are a helpful assistant.'
        //             },
        //             {
        //                 role: 'user',
        //                 content: userQuestion
        //             }
        //         ]
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${apiKey}`,
        //         },
        //     }
        // );

        const aiTextResponse = openaiResponse.data.choices[0].message.content.trim();
        res.json({ answer: aiTextResponse });
    } catch (error) {
        console.error('Error in handleGeneralQuestion:', error);
        res.status(500).json({ error: 'Error processing your question' });
    }
}

        
async function handleDatabaseQuestion(req, res, userQuestion) {
    const tables = {
        'spa_data': ["Date", "Service", "Price", "Duration", "ClientName", "Therapist"],
        'spa_services_data_premium': ["Date", "Service", "Price", "Duration", "ClientName", "Therapist"]
    };

    try {
        let systemMessage = "We have two tables for spa services. The 'spa_data' table includes everyday services with columns: Date, Service, Price, Duration, ClientName, and Therapist. The 'spa_services_data_premium' table includes premium services with the same columns. Please provide a SQL query based on the information provided.";

        // const queryResponse = await axios.post(
        //     'https://api.openai.com/v1/chat/completions',
        //     {
        //         model: "gpt-3.5-turbo",
        //         messages: [{
        //             role: "system",
        //             content: systemMessage
        //         }, {
        //             role: "user",
        //             content: userQuestion
        //         }]
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${apiKey}`,
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // );
        

        if (!queryResponse.data.choices[0] || !queryResponse.data.choices[0].message || !queryResponse.data.choices[0].message.content) {
            throw new Error("Invalid response from AI model");
        }

        const aiGeneratedText = queryResponse.data.choices[0].message.content.trim();
        console.log("AI-generated text:", aiGeneratedText); // Log the AI-generated text

        const sqlQueryMatch = aiGeneratedText.match(/```sql\n([\s\S]*?)\n```/is) || aiGeneratedText.match(/SELECT.*?;/is);
if (!sqlQueryMatch) {
    throw new Error("No valid SQL query found in AI's response.");
}

// Assuming the first match is the SQL query
let finalQuery = sqlQueryMatch[1] || sqlQueryMatch[0];
        finalQuery = finalQuery.replace(/\b(\w+)\b/g, (match, p1) => {
            return [...tables['spa_data'], ...tables['spa_services_data_premium']].includes(p1) ? `"${p1}"` : p1;
        });

        try {
            const result = await pool.query(finalQuery);
            res.json({ generatedQuery: finalQuery, queryResult: result.rows });
        } catch (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: err.message });
        }
    } catch (error) {
        console.error("Error in handleDatabaseQuestion:", error);
        res.status(500).json({ error: error.message || "Error processing your question" });
    }
}

app.post('/ask-question', async (req, res) => {
    const { userQuestion } = req.body;

    if (isDatabaseQuestion(userQuestion)) {
        await handleDatabaseQuestion(req, res, userQuestion);
    } else {
        await handleGeneralQuestion(req, res, userQuestion);
    }
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);});

