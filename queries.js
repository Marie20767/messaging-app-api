/* eslint-disable camelcase */
/* eslint-disable radix */
const { pool } = require('./database/database');
const demoThreads = require('./demo-threads');

const {
  insertDemoFriends,
  insertMessageThreadsId,
  insertMessageThreadsParticipants,
  insertMessageThreadsMessages,
} = demoThreads;

// request and response parameters are part of the Express API, if you don't use any of the 2 you can type '_'

const getUsers = (_, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error getting users' });
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getFriends = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM friends WHERE user_id_2 = $1', [id], (getFriendIdsError, results) => {
    if (getFriendIdsError) {
      console.log(getFriendIdsError);
      response.status(500).json({ error: 'Error getting friendIds' });
    } else {
      const friendsRows = results.rows;

      if (!friendsRows.length) {
        response.status(200).json([]);
      } else {
        const friendIdsArray = friendsRows.map((friendRow) => {
          return friendRow.user_id_1;
        });

        const queryParamatersArray = friendIdsArray.map((_, index) => {
          const queryParameter = index + 1;

          return `$${queryParameter}`;
        });

        const queryParametersString = queryParamatersArray.join(', ');

        pool.query(`SELECT * FROM users WHERE id IN (${queryParametersString})`, friendIdsArray, (getFriendsFromUsersError, friendResult) => {
          if (getFriendsFromUsersError) {
            console.log(getFriendsFromUsersError);
            response.status(500).json({ error: 'Error getting friends' });
          } else {
            response.status(200).json(friendResult.rows);
          }
        });
      }
    }
  });
};

const getMessages = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM message_thread_participants WHERE user_id = $1', [id], (getMessageThreadParticipantsError, results) => {
    if (getMessageThreadParticipantsError) {
      console.log(getMessageThreadParticipantsError);
      response.status(500).json({ error: 'Error getting messages' });
    } else {
      const messageThreadParticipants = results.rows;

      if (!messageThreadParticipants.length) {
        response.status(200).json([]);
      } else {
        const messageThreadIdsArray = messageThreadParticipants.map((participant) => {
          return participant.thread_id;
        });

        const queryParamatersArray = messageThreadIdsArray.map((_, index) => {
          const queryParameter = index + 1;

          return `$${queryParameter}`;
        });

        const queryParametersString = queryParamatersArray.join(', ');

        pool.query(`SELECT * FROM messages WHERE thread_id IN (${queryParametersString})`, messageThreadIdsArray, (getMessagesError, messagesResult) => {
          if (getMessagesError) {
            console.log(getMessagesError);
            response.status(500).json({ error: 'Error getting messages' });
          } else {
            response.status(200).json(messagesResult.rows);
          }
        });
      }
    }
  });
};

const getUserById = (request, response) => {
  // parseInt converts a string into a number
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error finding user' });
    } else {
      // Gives back the results of the query in an array, always use results.rows
      response.status(200).json(results.rows[0]);
    }
  });
};

const handleCreateUserError = (response, error) => {
  console.log(error);
  response.status(500).json({ error: 'Error creating user' });
};

const insertMessageThreadsOnRegisterUser = (response, registeredUserId) => {
  pool.query(insertMessageThreadsId, [], (messageThreadsIdError) => {
    if (messageThreadsIdError) {
      handleCreateUserError(response, messageThreadsIdError);
    } else {
      pool.query(insertMessageThreadsParticipants, [registeredUserId], (messageThreadsParticipantsError) => {
        if (messageThreadsParticipantsError) {
          handleCreateUserError(response, messageThreadsParticipantsError);
        } else {
          pool.query(insertMessageThreadsMessages, [registeredUserId], (messageThreadsMessages) => {
            if (messageThreadsMessages) {
              handleCreateUserError(response, messageThreadsMessages);
            } else {
              response.status(201).json(registeredUserId);
            }
          });
        }
      });
    }
  });
};

// TODO: see if we can use multiple requests at once or clean up all the if and else statements below
// TODO: handle generating demo threads when there is already data in the database (so we can't re-use existing message_thread IDs)

const createUser = (request, response) => {
  const { name, password, avatar_id } = request.body;

  pool.query('INSERT INTO users (name, password, avatar_id) VALUES ($1, $2, $3) RETURNING *', [name, password, avatar_id], (createUserError, results) => {
    if (createUserError) {
      handleCreateUserError(response, createUserError);
    } else {
      const registeredUserId = results.rows[0].id;

      // When you register, add as friends all the demo users to the registered user
      pool.query(insertDemoFriends, [registeredUserId], (insertDemoFriendsError) => {
        if (insertDemoFriendsError) {
          handleCreateUserError(response, insertDemoFriendsError);
        } else {
          // Once user has been created, insert some demo message threads for them
          insertMessageThreadsOnRegisterUser(response, registeredUserId);
        }
      });
    }
  });
};

// TODO: don't send back password

const loginUser = (request, response) => {
  const { name, password } = request.body;

  pool.query('SELECT * FROM users WHERE name = $1 AND password = $2', [name, password], (error, results) => {
    if (error) {
      console.log(error);
      response.status(401).json({ error: 'Wrong user name and/or password' });
    } else if (results.rows.length !== 0) {
      response.status(200).json(results.rows[0]);
    } else {
      response.status(401).json({ error: 'Wrong user name and/or password' });
    }
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { avatar_id } = request.body;

  pool.query('UPDATE users SET avatar_id = $1 WHERE id = $2', [avatar_id, id], (error) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error updating user' });
    }
    response.status(200).json(`User modified with ID: ${id}`);
  });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error deleting user' });
    } else {
      response.status(204).json(id);
    }
  });
};

const handleAddNewFriendError = (response, error) => {
  console.log(error);
  response.status(500).json({ error: 'Error adding new friend' });
};

const addNewFriend = (request, response) => {
  const { user_id, friend_id } = request.body;

  pool.query('INSERT INTO friends (user_id_1, user_id_2) VALUES ($1, $2), ($2, $1) RETURNING *', [user_id, friend_id], (addFriendError, results) => {
    if (addFriendError) {
      handleAddNewFriendError(response, addFriendError);
    } else {
      pool.query('INSERT INTO message_threads DEFAULT VALUES RETURNING *', [], (addMessageThreadIdsError, messageThreadResults) => {
        if (addMessageThreadIdsError) {
          handleAddNewFriendError(response, addMessageThreadIdsError);
        } else {
          const thread_id = messageThreadResults.rows[0].id;

          pool.query(
            'INSERT INTO message_thread_participants (thread_id, user_id) VALUES ($1, $2), ($1, $3) RETURNING *',
            [thread_id, user_id, friend_id],
            (addMessageThreadParticipantsError) => {
              if (addMessageThreadParticipantsError) {
                handleAddNewFriendError(response, addMessageThreadParticipantsError);
              } else {
                // Insert an empty message into the new thread so that when the client requests all messages they get at least one message for each thread
                pool.query(
                  'INSERT INTO messages (thread_id, sending_user_id, recipient_user_id, text, timestamp) VALUES ($1, $2, $3, $4, NOW())',
                  [thread_id, user_id, friend_id, ''],
                  (addEmptyMessageError) => {
                    if (addEmptyMessageError) {
                      handleAddNewFriendError(response, addEmptyMessageError);
                    } else {
                      response.status(201).json({
                        thread_id,
                        friend_id: results.rows[0].user_id_2,
                      });
                    }
                  },
                );
              }
            },
          );
        }
      });
    }
  });
};

module.exports = {
  getUsers,
  getFriends,
  getMessages,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  addNewFriend,
};
