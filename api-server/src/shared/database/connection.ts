require('dotenv-flow').config();

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database : 'test'
  }
});


export default knex;