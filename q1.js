const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  connectionLimit: 10
});
app.post('/customers', (req, res) => {
  const { name, phoneNumber } = req.body;
  if (!name || !phoneNumber) {
    return res.status(400).json({ error: 'Name and phoneNumber are required.' });
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      return res.status(500).json({ error: 'Failed to connect to the database.' });
    }
    connection.query('SELECT * FROM customers WHERE phoneNumber = ?', phoneNumber, (error, results) => {
      if (error) {
        console.error('Error executing database query:', error);
        connection.release();
        return res.status(500).json({ error: 'Failed to execute database query.' });
      }
      if (results.length > 0) {
        connection.release();
        return res.status(409).json({ error: 'Phone number already exists.' });
      }
      const customer = { name, phoneNumber };
      connection.query('INSERT INTO customers SET ?', customer, (error, result) => {
        connection.release();
        if (error) {
          console.error('Error executing database query:', error);
          return res.status(500).json({ error: 'Failed to execute database query.' });
        }
        return res.status(201).json({ message: 'Customer added successfully.' });
      });
    });
  });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
