const express = require('express')
const mysql = require('mysql2');
require('dotenv').config();
const app = express()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
 


// Question 1 goes here


app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving patients:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
  

// Question 2 goes here

app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving providers:', err);
        return res.status(500).json({ error: 'An error occurred while fetching providers' });
      }

 res.json(results);
  });
});

// Question 3 goes here
app.get('/patients', (req, res) => {
    const firstName = req.query.first_name; // Get the first name from query parameters
  
    if (!firstName) {
      return res.status(400).json({ error: 'First name query parameter is required' });
    }
  
    const query = 'SELECT * FROM patients WHERE first_name = ?';
    
    connection.query(query, [firstName], (err, results) => {
      if (err) {
        console.error('Error retrieving patients:', err);
        return res.status(500).json({ error: 'An error occurred while fetching patients' });
      }
  
      // Send the results as a JSON response
      res.json(results);
    });
});


// Question 4 goes here

app.get('/providers', (req, res) => {
    const specialty = req.query.specialty; // Get the specialty from query parameters
  
    if (!specialty) {
      return res.status(400).json({ error: 'Specialty query parameter is required' });
    }
  
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    
    connection.query(query, [specialty], (err, results) => {
      if (err) {
        console.error('Error retrieving providers:', err);
        return res.status(500).json({ error: 'An error occurred while fetching providers' });
      }
  
      // Send the results as a JSON response
      res.json(results);
    });
  });



// listen to the server
const PORT = 3306
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})