// Pool is a node-postgres module
// To make sure you don't have to create a connection to the database for every function
const Pool = require('pg').Pool
const e = require('express');
const demoThreads = require('./demo-threads');

const {
  insertMessageThreadsId,
  insertMessageThreadsParticipants,
  insertMessageThreadsMessages,
} = demoThreads;

const pool = new Pool({
  // details to connect to the databasen
  user: 'marieimpens',
  host: 'localhost',
  database: 'react_message_app',
  password: 'password',
  port: 5432,
})

// request and response parameters are part of the Express API, if you don't use any of the 2 you can type '_'

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

const getMessages = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM message_thread_participants WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error getting messages' })
    } else {
      const messageThreadParticipants = results.rows
      const messageThreadIdsArray = messageThreadParticipants.map((participant) => {
        return participant.thread_id
      })

      const queryParamatersArray = messageThreadIdsArray.map((_, index) => {
        const queryParameter = index + 1
        return `$${queryParameter}`
      })

      const queryParametersString = queryParamatersArray.join(', ')

      pool.query(`SELECT * FROM messages WHERE thread_id IN (${queryParametersString})`, messageThreadIdsArray, (error, messagesResult) => {
        if (error) {
          console.log(error);
          response.status(500).json({ error: 'Error getting messages' })
        } else {
          response.status(200).json(messagesResult.rows)
        }
      })
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
      response.status(200).json(results.rows[0])
    }
  })
}

const handleCreateUserError = (response, error) => {
  console.log(error);
  response.status(500).json({ error: 'Error creating user' })
}

// TODO: see if we can use multiple requests at once or clean up all the if and else statements below
// TODO: handle generating demo threads when there is already data in the database (so we can't re-use existing message_thread IDs)

const createUser = (request, response) => {
  const { name, password, avatar_id } = request.body

  pool.query('INSERT INTO users (name, password, avatar_id) VALUES ($1, $2, $3) RETURNING *', [name, password, avatar_id], (error, results) => {
    if (error) {
      handleCreateUserError(response, error);
    } else {
      // Once user has been created, insert some demo message threads for them
      pool.query(insertMessageThreadsId, [], (error) => {
        if (error) {
          handleCreateUserError(response, error);
        } else {
          pool.query(insertMessageThreadsParticipants, [results.rows[0].id], (error) => {
            if (error) {
              handleCreateUserError(response, error)
            } else {
              pool.query(insertMessageThreadsMessages, [results.rows[0].id], (error) => {
                if (error) {
                  handleCreateUserError(response, error)
                } else {
                  response.status(201).json(results.rows[0].id)
                }
              })
            }
          })
        }
      })
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

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { avatar_id } = request.body

  pool.query('UPDATE users SET avatar_id = $1 WHERE id = $2', [avatar_id, id], (error) => {
      if (error) {
        console.log(error);
        response.status(500).json({ error: 'Error updating user' })
      }
      response.status(200).json(`User modified with ID: ${id}`)
    }
  )
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
  getUsers,
  getMessages,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
}
