DROP TABLE users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  password VARCHAR(30)
);

CREATE TABLE message_threads (
  ID SERIAL PRIMARY KEY,
);

CREATE TABLE message_thread_participants (
  thread_id INT NOT NULL,
  user_id INT NOT NULL,

  PRIMARY KEY (thread_id, user_id)

  -- Make sure that thread_id and user_id exist in their respective tables
  CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id)
  CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  thread_id INT NOT NULL,
  sending_user_id INT NOT NULL,
  text TEXT,
  timestamp TIMESTAMPTZ,

  CONSTRAINT fk_users FOREIGN KEY(sending_user_id) REFERENCES users(id)
  CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id)
);

INSERT INTO users (username, password)
  VALUES ('Charlie', '1234'), ('Jamie', '1234'), ('Jess', '1234'), ('Ava', '1234'), ('Leo', '1234'), ('Evie', '1234'), ('Harry', '1234'), ('Luna', '1234'), ('Theo', '1234'), ('Aria', '1234'), ('Zara', '1234');