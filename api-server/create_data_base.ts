const mysql = require("mysql2");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS test`,
  function (err: any, results: any) {
    console.log(results);
    console.log(err);
  }
);

// Run create tabase produtos
connection.query(
  `CREATE TABLE IF NOT EXISTS test.produtos (
    id BIGINT auto_increment NOT NULL,
    nome varchar(100) NOT NULL,
    descricao varchar(100) NOT NULL,
    preco DOUBLE NOT NULL,
    quantidade INT NOT NULL,
    data_criacao DATETIME NOT NULL,
    data_atualizacao DATETIME NULL,
    CONSTRAINT produtos_PK PRIMARY KEY (id)
  )
  ENGINE=InnoDB
  DEFAULT CHARSET=utf8;`,
  function (err: any, results: any) {
    console.log(results);
    console.log(err);
  }
);

// Run create tabase compras
connection.query(
  `CREATE TABLE IF NOT EXISTS test.compras (
    id BIGINT auto_increment NOT NULL,
    total DOUBLE NOT NULL,
    data_criacao DATETIME NOT NULL,
    tipo_pagamento varchar(100) NOT NULL,
    status varchar(100) NOT NULL,
    CONSTRAINT compras_PK PRIMARY KEY (id)
  )
  ENGINE=InnoDB
  DEFAULT CHARSET=utf8;`,
  function (err: any, results: any) {
    console.log(results);
    console.log(err);
  }
);

// Run create tabase compras
connection.query(
  `CREATE TABLE IF NOT EXISTS test.compra_produtos (
    id BIGINT auto_increment NOT NULL,
    id_compra BIGINT NOT NULL,
    id_produto BIGINT NOT NULL,
    quantidade INT NOT NULL,
    preco DOUBLE NOT NULL,
    CONSTRAINT compra_produtos_PK PRIMARY KEY (id)
  )
  ENGINE=InnoDB
  DEFAULT CHARSET=utf8;`,
  function (err: any, results: any) {
    console.log(results);
    console.log(err);
  }
);

// Close the connection
connection.end();

export default connection;