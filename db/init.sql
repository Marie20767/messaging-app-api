DROP DATABASE react_message_app;
CREATE DATABASE react_message_app;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(30),
  password VARCHAR(30),
);

CREATE TABLE message_threads (
  ID SERIAL PRIMARY KEY,
  -- TODO: work in progress:
  -- CONSTRAINT fk_article FOREIGN KEY(article_id) REFERENCES article(id)
  -- CONSTRAINT fk_tag FOREIGN KEY(tag_id) REFERENCES tag(id)
  -- participants VARCHAR(30),
  -- messages VARCHAR(30)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  text TEXT,
  timestamp TIMESTAMPTZ,
  -- TODO: work in progress:
  -- CONSTRAINT fk_message_threads FOREIGN KEY(message_thread_id) REFERENCES message_threads(id)
);

-- TODO: put in fake users

INSERT INTO users (username, password)
  VALUES ('Jerry', '1234'), ('George', '1234');