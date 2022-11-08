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

const getUsersInfoWithoutPassword = (userResults) => {
  return userResults.reduce((acc, friend) => {
    return [
      ...acc,
      {
        id: friend.id,
        name: friend.name,
        avatar_id: friend.avatar_id,
      },
    ];
  }, []);
};

const getUsers = (_, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: 'Error getting users' });
    } else {
      const userResults = getUsersInfoWithoutPassword(results.rows);

      response.status(200).json(userResults);
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
            const friendsResults = getUsersInfoWithoutPassword(friendResult.rows);

            response.status(200).json(friendsResults);
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

const getCurrentUserInfoWithoutPassword = (currentUserResult) => {
  return {
    id: currentUserResult.id,
    name: currentUserResult.name,
    avatar_id: currentUserResult.avatar_id,
  };
};

const getUserById = (request, response) => {
  // parseInt converts a string into a number
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error || !results.rows?.length) {
      console.log(error);
      response.status(500).json({ error: 'Error finding user' });
    } else {
      // Gives back the results of the query in an array, always use results.rows
      const currentUserResult = getCurrentUserInfoWithoutPassword(results.rows[0]);

      response.status(200).json(currentUserResult);
    }
  });
};

const handleCreateUserError = (response, error) => {
  console.log(error);
  response.status(500).json({ error: 'Error creating user' });
};

const insertMessageThreadsOnRegisterUser = (response, registeredUserId) => {
  pool.query(insertMessageThreadsId, [], (messageThreadsIdError, messageThreadsIdResults) => {
    if (messageThreadsIdError) {
      handleCreateUserError(response, messageThreadsIdError);
    } else {
      // messageThreadsIdResults example - [ { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 } ... ]
      const arrayOfMessageThreadIds = messageThreadsIdResults.rows.map((result) => {
        return result.id;
      });

      // threadQueryParams example - [47, 8, 9, 10, 11]
      const threadQueryParams = [registeredUserId, ...arrayOfMessageThreadIds];

      pool.query(insertMessageThreadsParticipants, threadQueryParams, (messageThreadsParticipantsError) => {
        if (messageThreadsParticipantsError) {
          handleCreateUserError(response, messageThreadsParticipantsError);
        } else {
          pool.query(insertMessageThreadsMessages, threadQueryParams, (messageThreadsMessages) => {
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

const loginUser = (request, response) => {
  const { name, password } = request.body;

  pool.query('SELECT * FROM users WHERE name = $1 AND password = $2', [name, password], (error, results) => {
    if (error) {
      console.log(error);
      response.status(401).json({ error: 'Wrong user name and/or password' });
    } else if (results.rows.length !== 0) {
      const currentUserResult = getCurrentUserInfoWithoutPassword(results.rows[0]);

      response.status(200).json(currentUserResult);
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
                  'INSERT INTO messages (thread_id, sending_user_id, recipient_user_id, text, timestamp, read) VALUES ($1, $2, $3, $4, NOW(), $5)',
                  [thread_id, user_id, friend_id, '', true],
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

const updateReadMessages = (request, response) => {
  const { thread_id } = request.body;

  pool.query('UPDATE messages SET read = true WHERE thread_id = $1', [thread_id], (updateReadMessagesError) => {
    if (updateReadMessagesError) {
      console.log(updateReadMessagesError);
      response.status(500).json({ error: 'Error updating read messages' });
    } else {
      response.status(204).json(thread_id);
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
  updateReadMessages,
};
