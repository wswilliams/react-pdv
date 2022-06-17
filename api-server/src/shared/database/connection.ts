require('dotenv-flow').config();

console.log("ENVIRORMENT: ", process.env.NODE_ENV)

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'mysqldb',
    port : 3306,
    user : 'root',
    password : '123456',
    database : 'pdv'
  }
});



export default knex;