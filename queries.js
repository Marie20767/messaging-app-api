// Pool is a node-postgres module
// To make sure you don't have to create a connection to the database for every function
const Pool = require('pg').Pool

const pool = new Pool({
  // details to connect to the database
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// GET: / | displayHome()
// GET: /users | getUsers()
// GET: /users/:id | getUserById()
// POST: /users | createUser()
// PUT: /users/:id | updateUser()
// DELETE: /users/:id | deleteUser()

// Request, response parameters are part of the Express API, if you don't use one you can type '_'

const displayHome = (_, response) => {
    response.json({ info: 'Messaging API' })
}

const getUsers = (_, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).send('Error')
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
      response.status(500).send('Error')
    } else {
      // Gives back the results of the query in an array, always use results.rows
      response.status(200).json(results.rows)
    }

  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).send('Error')
    } else {
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send('Error')
      } else {
        response.status(200).send(`User modified with ID: ${id}`)
      }
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error) => {
    if (error) {
      console.log(error);
      response.status(500).send('Error')
    } else {
      response.status(200).send(`User deleted with ID: ${id}`)
    }
  })
}

module.exports = {
  displayHome,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
