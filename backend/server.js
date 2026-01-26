const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Environment Variables for Database Connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'user_db',
  port: 3306
};

const db = mysql.createPool(dbConfig);

// Helper function to get next file number
function getNextFileNumber(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    return 1;
  }
  
  const files = fs.readdirSync(directory);
  const csvFiles = files.filter(file => file.startsWith('users_') && file.endsWith('.csv'));
  
  if (csvFiles.length === 0) {
    return 1;
  }
  
  const numbers = csvFiles.map(file => {
    const match = file.match(/users_(\d+)\.csv/);
    return match ? parseInt(match[1]) : 0;
  });
  
  return Math.max(...numbers) + 1;
}

app.post('/users', (req, res) => {
  const { email, firstname, lastname } = req.body;
  const query = 'INSERT INTO users (email, firstname, lastname) VALUES (?, ?, ?)';
  db.query(query, [email, firstname, lastname], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created', id: result.insertId });
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/save-csv', (req, res) => {
  const dataDir = path.join(__dirname, 'data');
  const fileNumber = getNextFileNumber(dataDir);
  const fileName = `users_${fileNumber}.csv`;
  const filePath = path.join(dataDir, fileName);
  
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'user_id', title: 'ID' },
        { id: 'email', title: 'EMAIL' },
        { id: 'firstname', title: 'FIRSTNAME' },
        { id: 'lastname', title: 'LASTNAME' }
      ]
    });
    
    csvWriter.writeRecords(results)
      .then(() => res.json({ 
        message: `File saved as ${fileName}`,
        filename: fileName,
        fileNumber: fileNumber
      }))
      .catch(err => res.status(500).json({ error: err }));
  });
});

app.listen(3000, () => console.log(`Backend running on port 3000`));
