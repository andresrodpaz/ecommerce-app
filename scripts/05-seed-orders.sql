-- Creating sample orders and reviews for realistic e-commerce data
-- Sample Orders Data
INSERT INTO orders (user_id, total_amount, status, payment_method, payment_status, shipping_address, billing_address) VALUES
(2, 1329.98, 'delivered', 'wallet', 'paid', 'Calle Mayor 123, 28001 Madrid, España', 'Calle Mayor 123, 28001 Madrid, España'),
(3, 49.75, 'delivered', 'credit_card', 'paid', 'Avenida Libertad 456, 08001 Barcelona, España', 'Avenida Libertad 456, 08001 Barcelona, España'),
(4, 899.99, 'shipped', 'wallet', 'paid', 'Plaza España 789, 41001 Sevilla, España', 'Plaza España 789, 41001 Sevilla, España'),
(5, 49.25, 'delivered', 'paypal', 'paid', 'Gran Vía 321, 46001 Valencia, España', 'Gran Vía 321, 46001 Valencia, España');

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
(1, 1, 1, 1299.99, 1299.99), -- Laptop Gaming
(1, 5, 1, 29.99, 29.99),     -- Camiseta Nike
(2, 13, 1, 49.99, 49.99),    -- Clean Code book
(3, 8, 1, 899.99, 899.99),   -- Bicicleta Trek
(4, 13, 1, 49.99, 49.99);    -- Clean Code book

-- Sample Product Reviews
INSERT INTO product_reviews (product_id, user_id, rating, title, comment, is_verified_purchase) VALUES
(1, 2, 5, 'Excelente laptop gaming', 'Perfecta para juegos en alta calidad. Muy recomendada.', true),
(5, 2, 4, 'Buena camiseta deportiva', 'Cómoda y de buena calidad, aunque un poco cara.', true),
(13, 3, 5, 'Libro imprescindible', 'Todo programador debería leer este libro. Excelente.', true),
(8, 4, 4, 'Buena bicicleta', 'Calidad precio correcta, ideal para montaña.', false),
(13, 5, 5, 'Muy educativo', 'Cambió mi forma de programar completamente.', true);

-- Sample Cart Items (current shopping carts)
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(2, 3, 1), -- Samsung Galaxy S24
(2, 6, 1), -- Sony Headphones
(3, 15, 2), -- Cafetera Nespresso
(4, 11, 1), -- Zapatillas Adidas
(5, 14, 1); -- Crema L'Oréal
