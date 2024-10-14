-- Seed data for staff table
INSERT INTO staff (first_name, last_name, email, password, role) VALUES
('John', 'Doe', 'john.doe@example.com', '$2b$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDp1Ia5hwrbu', 'admin'),
('Jane', 'Smith', 'jane.smith@example.com', '$2b$10$uKrHw7GoLwg9uX37k1.8MuDCvnuuN.PsJ9dUcM.1qE7YMwSRT7Lh2', 'staff'),
('Bob', 'Johnson', 'bob.johnson@example.com', '$2b$10$3JqrZAj8KxfAFvNwjODz6.Rr4PtfVzMfU5oyJkEf0zJzVvxKsZXMa', 'staff');

-- Seed data for items table
INSERT INTO items (name, location, description, date_found, image_url, status, added_by_id) VALUES
('Blue Umbrella', 'Main Lobby', 'Navy blue folding umbrella', '2023-05-15', 'https://example.com/blue-umbrella.jpg', 'unclaimed', 1),
('Silver Watch', 'Conference Room A', 'Men''s silver analog watch', '2023-05-16', 'https://example.com/silver-watch.jpg', 'unclaimed', 2),
('Black Laptop Bag', 'Cafeteria', 'Dell laptop bag with shoulder strap', '2023-05-17', 'https://example.com/laptop-bag.jpg', 'unclaimed', 3),
('Red Scarf', 'Reception Area', 'Wool scarf with fringe', '2023-05-18', 'https://example.com/red-scarf.jpg', 'claimed', 1),
('Sunglasses', 'Parking Lot', 'Ray-Ban aviator sunglasses', '2023-05-19', 'https://example.com/sunglasses.jpg', 'unclaimed', 2);