// Pool is a node-postgres module
// To make sure you don't have to create a connection to the database for every function
const { Pool } = require('pg');

const pool = new Pool({
  // details to connect to the database
  user: 'marieimpens',
  host: 'localhost',
  database: 'react_message_app',
  password: 'password',
  port: 5432,
});

module.exports = { pool };
