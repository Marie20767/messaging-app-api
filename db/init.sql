DROP DATABASE react_message_app;
CREATE DATABASE react_message_app;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  password VARCHAR(30),
);

CREATE TABLE message_threads (
  ID SERIAL PRIMARY KEY,
);

CREATE TABLE message_thread_participants (
  thread_id INT NOT NULL,
  user_id INT NOT NULL,

  PRIMARY KEY (thread_id, user_id)

  CONSTRAINT fk_message_threads FOREIGN KEY(message_thread_id) REFERENCES message_threads(id)
  CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  text TEXT,
  timestamp TIMESTAMPTZ,
  sending_user_id INT NOT NULL,

  CONSTRAINT fk_users FOREIGN KEY(sending_user_id) REFERENCES users(id)
  CONSTRAINT fk_message_threads FOREIGN KEY(message_thread_id) REFERENCES message_threads(id)
);

INSERT INTO users (username, password)
  VALUES ('Jerry', '1234'), ('George', '1234');