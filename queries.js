// Pool is a node-postgres module
// To make sure you don't have to create a connection to the database for every function
const Pool = require('pg').Pool

const pool = new Pool({
  // details to connect to the database
  user: 'marieimpens',
  host: 'localhost',
  database: 'react_message_app',
  password: 'password',
  port: 5432,
})

// GET: / | displayHome()
// GET: /users | getUsers()
// GET: /users/:id | getUserById()
// POST: /users | createUser()
// POST: /login |loginUser()
// DELETE: /users/:id | deleteUser()

// request and response parameters are part of the Express API, if you don't use any of the 2 you can type '_'
const displayHome = (_, response) => {
    response.json({ info: 'Messaging API' })
}

const getUsers = (_, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error getting users' })
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getUserById = (request, response) => {
  // parseInt converts a string into a number
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error finding user' })
    } else {
      // Gives back the results of the query in an array, always use results.rows
      response.status(200).json(results.rows)
    }

  })
}

const createUser = (request, response) => {
  const { name, password, avatar_id } = request.body

  pool.query('INSERT INTO users (name, password, avatar_id) VALUES ($1, $2, $3) RETURNING *', [name, password, avatar_id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error creating user' })
    } else {
      response.status(201).json(results.rows[0].id)
    }
  })
}

// TODO: don't send back password

const loginUser = (request, response) => {
  const { name, password } = request.body

  pool.query('SELECT * FROM users WHERE name = $1 AND password = $2', [name, password], (error, results) => {
    if (error) {
      console.log(error);
      response.status(401).json({ error: 'Wrong user name and/or password' })
    } else {
      if (results.rows.length !== 0) {
        response.status(200).json(results.rows[0])
      } else {
        response.status(401).json({ error: 'Wrong user name and/or password' })
      }
    }
  })
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error deleting user' })
    } else {
      response.status(204).json(id)
    }
  })
}

module.exports = {
  displayHome,
  getUsers,
  getUserById,
  createUser,
  loginUser,
  deleteUser,
}
