const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL database is connected.');
});

function seed() {  
  connection.query('CREATE DATABASE IF NOT EXISTS activity5;', (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    if (result.warningCount === 1) return;

    connection.query('USE activity5;');

    connection.query('CREATE TABLE customerTypes (customerTypes_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL);');

    connection.query('CREATE TABLE customers (customers_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, addressType VARCHAR(255) NOT NULL, number VARCHAR(255) NOT NULL, complement VARCHAR(255) NOT NULL, district VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, state VARCHAR(255) NOT NULL, zipCode VARCHAR(255) NOT NULL, customerTypes_id INT NOT NULL REFERENCES customerTypes(customerTypes_id));');

    connection.query('INSERT INTO customerTypes VALUES (1, "preferencial"), (2, "bronze"), (3, "prata"), (4, "ouro"), (5, "black");');
  });

  connection.query('USE activity5;');
}

seed();

exports.connection = connection;