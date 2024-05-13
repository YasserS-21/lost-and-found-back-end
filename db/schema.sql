DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS items;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	pic text
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  date_lost DATE,
  image_url TEXT,
  owner_id INT,
  CONSTRAINT fk_owner_id FOREIGN KEY(owner_id) REFERENCES users(id)
);