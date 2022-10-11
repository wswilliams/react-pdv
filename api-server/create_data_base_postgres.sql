CREATE DATABASE IF NOT EXISTS `postgres` /*!40100 DEFAULT CHARACTER SET latin1 */;

FLUSH PRIVILEGES;

USE postgres;

SET SQL_MODE="NO_ZERO_IN_DATE";

CREATE TABLE IF NOT EXISTS `produtos` (
  `id` serial primary key ,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `preco` decimal NOT NULL,
  `quantidade` int NOT NULL,
  `data_criacao` TIMESTAMP DEFAULT NOT NULL,
  `data_atualizacao` TIMESTAMP DEFAULT NULL
);
-- test.compras definition

CREATE TABLE  IF NOT EXISTS `compras` (
   `id` serial primary key ,
  `total` decimal NOT NULL,
  `data_criacao` TIMESTAMP NOT NULL,
  `tipo_pagamento` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
);

-- test.compra_produtos definition

CREATE TABLE  IF NOT EXISTS  `compra_produtos` (
  `id` serial primary key ,
  `id_compra` int NOT NULL,
  `id_produto` int NOT NULL,
  `quantidade` int NOT NULL,
  `preco` decimal NOT NULL
);