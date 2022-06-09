require('dotenv-flow').config();

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '1234',
    database : 'test'
  }
});


export default knex;