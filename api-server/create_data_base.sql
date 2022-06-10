 CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET latin1 */;

CREATE TABLE IF NOT EXISTS `produtos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `preco` double NOT NULL,
  `quantidade` int(11) NOT NULL,
  `data_criacao` datetime NOT NULL,
  `data_atualizacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGI

-- test.compras definition

CREATE TABLE  IF NOT EXISTS `compras` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `total` double NOT NULL,
  `data_criacao` datetime NOT NULL,
  `tipo_pagamento` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGIN

-- test.compra_produtos definition

CREATE TABLE  IF NOT EXISTS  `compra_produtos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_compra` bigint(20) NOT NULL,
  `id_produto` bigint(20) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `preco` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=Inn