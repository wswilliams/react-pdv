//const { Client } = require('pg')
//const client = new Client()
//client.connect()
//client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
 // console.log(err ? err.stack : res.rows[0].message) // Hello World!
 // client.end()
//})
async function connect() {

  const { Pool } = require('pg');
  const pool = new Pool({
      connectionString: 'postgres://postgres:postgres@localhost:5432/postgres'
  });

  //apenas testando a conexão
  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");

  // Run create tabase produtos
  const produtos = await client.query(
   `CREATE TABLE IF NOT EXISTS produtos (
    id serial primary key ,
    nome varchar(100) NOT NULL,
    descricao varchar(100) NOT NULL,
    preco decimal NOT NULL,
    quantidade int NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP NULL
      )`
        ,
  function (err: any, results: any) {
    console.log(results);
    console.log(err);
  }
);

 // Run create tabase compras
 const compras = await client.query(
  `CREATE TABLE  IF NOT EXISTS compras (
    id serial primary key ,
   total decimal NOT NULL,
   data_criacao TIMESTAMP NOT NULL,
   tipo_pagamento varchar(100) NOT NULL,
   status varchar(100) NOT NULL
 )`
   ,
 function (err: any, results: any) {
   console.log(results);
   console.log(err);
 }
);

 // Run create tabase compra_produtos
 const compra_produtos = await client.query(
  `CREATE TABLE IF NOT EXISTS public.compra_produtos (
     id serial primary key ,
     id_compra int NOT NULL,
    id_produto int NOT NULL,
    quantidade int NOT NULL,
    preco decimal NOT NULL)`,
 function (err: any, results: any) {
   console.log(results);
   console.log(err);
 }
);

  // Run create tabase produtos
  const jogos = await client.query(
    `CREATE TABLE IF NOT EXISTS public.jogos (
     id serial primary key ,
     numero int NOT NULL,
     concurso varchar(100) NOT NULL,
     data_jogo varchar(20) NOT NULL
       )`,
   function (err: any, results: any) {
     console.log(results);
     console.log(err);
   }
 );
  // Run create tabase produtos
  const classificacao = await client.query(
    `CREATE TABLE IF NOT EXISTS public.classificacoes (
     id serial primary key ,
     numero int NOT NULL,
     peso int NOT NULL,
     concurso varchar(100) NOT NULL,
     data_jogo TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )`,
   function (err: any, results: any) {
     console.log(results);
     console.log(err);
   }
 );

   // Run create tabase produtos
   const simulador = await client.query(
    `CREATE TABLE IF NOT EXISTS simulador (
     id serial primary key ,
     bol1 int NOT NULL,
     bol2 int NOT NULL,
     bol3 int NOT NULL,
     bol4 int NOT NULL,
     bol5 int NOT NULL,
     bol6 int NOT NULL,
     data_jogo TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )`,
   function (err: any, results: any) {
     console.log(results);
     console.log(err);
   }
 );

client.release();
  //guardando para usar sempre o mesmo
}
//connect();


export default connect();