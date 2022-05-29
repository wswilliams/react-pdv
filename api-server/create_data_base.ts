const mysql = require("mysql2");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS test`,
  function (err: any, results: any) {
    console.log(results);
    console.log(err);
  }
);

// Close the connection
connection.end();

export default connection;