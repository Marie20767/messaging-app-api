DROP TABLE users;

-- TODO: change the VARCHAR
-- Fix code for the message threads etc

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  password VARCHAR(30),
  avatar_id VARCHAR(30)
);

-- CREATE TABLE message_threads (
--   ID SERIAL PRIMARY KEY,
-- );

-- CREATE TABLE message_thread_participants (
--   thread_id INT NOT NULL,
--   user_id INT NOT NULL,

--   PRIMARY KEY (thread_id, user_id),

--   -- Make sure that thread_id and user_id exist in their respective tables
--   CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id),
--   CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
-- );

-- CREATE TABLE messages (
--   ID SERIAL PRIMARY KEY,
--   thread_id INT NOT NULL,
--   sending_user_id INT NOT NULL
--   text TEXT,
--   timestamp TIMESTAMPTZ,

--   CONSTRAINT fk_users FOREIGN KEY(sending_user_id) REFERENCES users(id),
--   CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id)
-- );

INSERT INTO users (name, password, avatar_id)
  VALUES ('Charlie', '1234', 'weasel-id'), ('Jamie', '1234', 'seal-id' ), ('Jess', '1234', 'deer2-id'), ('Ava', '1234', 'koala-id'), ('Leo', '1234', 'rabbit2-id'), ('Evie', '1234', 'meerkat-id'), ('Harry', '1234', 'fox2-id'), ('Luna', '1234', 'deer-id'), ('Theo', '1234', 'snake-id'), ('Aria', '1234', 'chicken-id')