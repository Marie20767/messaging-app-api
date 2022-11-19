DROP SEQUENCE user_id_seq CASCADE;
DROP TABLE users CASCADE;
DROP TABLE friends CASCADE;
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
  password VARCHAR(256),
  avatar_id VARCHAR(30)
);

CREATE TABLE friends (
  ID SERIAL PRIMARY KEY,
  user_id_1 INT NOT NULL,
  user_id_2 INT NOT NULL,

  CONSTRAINT fk_users FOREIGN KEY(user_id_1) REFERENCES users(id),
                      FOREIGN KEY(user_id_2) REFERENCES users(id)
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
  sending_user_id INT NOT NULL,
  ID SERIAL PRIMARY KEY,
  thread_id INT NOT NULL,
  recipient_user_id INT NOT NULL,
  text TEXT,
  timestamp TIMESTAMPTZ,
  read BOOLEAN,

  CONSTRAINT fk_users FOREIGN KEY(sending_user_id) REFERENCES users(id),
  CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id)
);

INSERT INTO users (id, name, password, avatar_id)
VALUES
  (1, 'Hermione', 'messageoh1234', 'weasel-id'),
  (2, 'Neville', 'messageoh1234', 'meerkat-id'),
  (3, 'Ron', 'messageoh1234', 'snake-id'),
  (4, 'Ginny', 'messageoh1234', 'koala-id'),
  (5, 'Sirius', 'messageoh1234', 'rabbit2-id'),
  (6, 'Rubeus', 'messageoh1234', 'seal-id'),
  (7, 'Harry', 'messageoh1234', 'fox2-id'),
  (8, 'Luna', 'messageoh1234', 'deer-id'),
  (9, 'Albus', 'messageoh1234', 'deer2-id'),
  (10, 'Minerva', 'messageoh1234', 'chicken-id');
