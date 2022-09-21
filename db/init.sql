DROP TABLE users CASCADE;
DROP TABLE messages CASCADE;
DROP TABLE message_threads CASCADE;
DROP TABLE message_thread_participants CASCADE;

-- TODO: change the VARCHAR

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
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
  text TEXT,
  timestamp TIMESTAMPTZ,

  CONSTRAINT fk_users FOREIGN KEY(sending_user_id) REFERENCES users(id),
  CONSTRAINT fk_message_threads FOREIGN KEY(thread_id) REFERENCES message_threads(id)
);

INSERT INTO users (id, name, password, avatar_id)
VALUES
  (1, 'Hermione', '1234', 'weasel-id'),
  (2, 'Rubeus', '1234', 'seal-id'),
  (3, 'Albus', '1234', 'deer2-id'),
  (4, 'Ginny', '1234', 'koala-id'),
  (5, 'Sirius', '1234', 'rabbit2-id'),
  (6, 'Neville', '1234', 'meerkat-id'),
  (7, 'Harry', '1234', 'fox2-id'),
  (8, 'Luna', '1234', 'deer-id'),
  (9, 'Ron', '1234', 'snake-id'),
  (10, 'Minerva', '1234', 'chicken-id');


INSERT INTO message_threads (id)
VALUES
  (1),
  (2);


INSERT INTO message_thread_participants (thread_id, user_id)
VALUES
  -- Message thread 1 between Sirius and Harry
  (1, 5),
  (1, 7),

  -- Message thread 2 between Luna and Harry
  (2, 8),
  (2, 7);


INSERT INTO messages (thread_id, sending_user_id, text, timestamp)
VALUES
  -- Messages between Sirius (5) and Harry (7)
  (1, 7, 'I miss my parents...', current_date - interval '30 minutes'),
  (1, 5, 'I know Harry. I miss them too.', current_date - interval '29 minutes'),
  (1, 5, 'It''s not fair that I got to spend so much time with them and you didn''t...', current_date - interval '28 minutes'),
  (1, 7, 'Why did they have to die Sirius?', current_date - interval '28 minutes'),
  (1, 5, 'I don''t know Harry. I wish I did but I don''t...', current_date - interval '27 minutes'),
  (1, 5, 'I know I am not your father Harry but I will always be there for you if I can help it...', current_date - interval '25 minutes'),
  (1, 7, 'Thanks', current_date - interval '24 minutes'),

  -- Messages between Luna (8) and Harry (7)
  (2, 8, 'Hello', current_date - interval '45 minutes'),
  (2, 7, 'How come you''re not at the feast?', current_date - interval '44 minutes'),
  (2, 8, 'Well, I''ve lost most of my possessions.', current_date - interval '43 minutes'),
  (2, 8, 'People take them and hide them, you know. But as it''s the last night, I really do need them back, so I''ve been putting up signs.', current_date - interval '42 minutes'),
  (2, 7, 'How come people hide your stuff?', current_date - interval '41 minutes'),
  (2, 8, 'Oh... well...', current_date - interval '40 minutes'),
  (2, 8, 'I think they think I''m a bit odd, you know. Some people call me ''Loony'' Lovegood, actually.', current_date - interval '39 minutes'),
  (2, 7, 'That''s no reason for them to take your things, Do you want help finding them?', current_date - interval '38 minutes'),
  (2, 8, 'Oh no, They''ll come back, they always do in the end.', current_date - interval '37 minutes');

