DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS staff;


CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'staff'
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    date_found DATE NOT NULL,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'unclaimed',
    added_by_id INT NOT NULL,
    date_claimed DATE,
    claimed_by TEXT,
    color VARCHAR(50),
    item_type VARCHAR(50),
    CONSTRAINT fk_added_by FOREIGN KEY(added_by_id) REFERENCES staff(id)
);
