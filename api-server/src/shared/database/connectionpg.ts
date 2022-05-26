require('dotenv-flow').config();

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST_PG,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME_PG
  },
  pool: { min: 2, max: 10 },
  acquireConnectionTimeout: 90000
});

export default knex;