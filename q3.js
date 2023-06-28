const mysql = require('mysql');
const customers = [
  {
    email: "anurag11@yopmail.com",
    name: "anurag"
  },
  {
    email: "sameer11@yopmail.com",
    name: "sameer"
  },
  {
    email: "ravi11@yopmail.com",
    name: "ravi"
  },
  {
    email: "akash11@yopmail.com",
    name: "akash"
  },
  {
    email: "anjali11@yopmail.com",
    name: "anjai"
  },
  {
    email: "santosh11@yopmail.com",
    name: "santosh"
  }
];
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database.');
  customers.forEach((customer) => {
    const { email, name } = customer;
    const insertQuery = 'INSERT INTO customers (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?';
    const params = [name, email, name];

    connection.query(insertQuery, params, (error, result) => {
      if (error) {
        console.error('Error inserting customer:', error);
        return;
      }
      console.log('Customer inserted:', result.insertId);
    });
  });
  connection.end((error) => {
    if (error) {
      console.error('Error closing the database connection:', error);
      return;
    }
    console.log('Database connection closed.');
  });
});
