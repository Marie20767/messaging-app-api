DROP SEQUENCE user_id_seq CASCADE;
DROP TABLE users CASCADE;
DROP TABLE messages CASCADE;
DROP TABLE message_threads CASCADE;
DROP TABLE message_thread_participants CASCADE;

CREATE SEQUENCE user_id_seq
    AS integer
    START WITH 11
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE users (
  ID INT DEFAULT nextval('user_id_seq') PRIMARY KEY,
  name VARCHAR(30),
  password VARCHAR(30),
  avatar_id VARCHAR(30)
);

CREATE TABLE message_threads (
  ID SERIAL PRIMARY KEY
);

CREATE TABLE message_thread_participants (
  thread_id INT NOT NULL,
  user_id INT NOT NULL,

  PRIMARY KEY (thread_id, user_id),

  -- Make sure that thread_id and user_id exist in their respective tables
  CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id),
  CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  thread_id INT NOT NULL,
  sending_user_id INT NOT NULL,
  recipient_user_id INT NOT NULL,
  text TEXT,
  timestamp TIMESTAMPTZ,

  CONSTRAINT fk_users FOREIGN KEY(sending_user_id) REFERENCES users(id),
  CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id)
);

INSERT INTO users (id, name, password, avatar_id)
VALUES
  (1, 'Hermione', '1234', 'weasel-id'),
  (2, 'Neville', '1234', 'meerkat-id'),
  (3, 'Ron', '1234', 'snake-id'),
  (4, 'Ginny', '1234', 'koala-id'),
  (5, 'Sirius', '1234', 'rabbit2-id'),
  (6, 'Rubeus', '1234', 'seal-id'),
  (7, 'Harry', '1234', 'fox2-id'),
  (8, 'Luna', '1234', 'deer-id'),
  (9, 'Albus', '1234', 'deer2-id'),
  (10, 'Minerva', '1234', 'chicken-id');