-- Creating test users with wallets for comprehensive testing
-- Seed Users and Wallets Data
INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES
('admin@ecommerce-demo.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Admin', 'Sistema', '+34600000000', 'admin'),
('juan.perez@email.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Juan', 'Pérez', '+34600111111', 'customer'),
('maria.garcia@email.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'María', 'García', '+34600222222', 'customer'),
('carlos.lopez@email.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Carlos', 'López', '+34600333333', 'customer'),
('ana.martinez@email.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Ana', 'Martínez', '+34600444444', 'customer'),
('test.user@email.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Test', 'User', '+34600555555', 'customer');

-- Create wallets for all users
INSERT INTO wallets (user_id, balance, currency) VALUES
(1, 10000.00, 'EUR'), -- Admin wallet with high balance
(2, 500.50, 'EUR'),   -- Juan's wallet
(3, 750.25, 'EUR'),   -- María's wallet
(4, 1200.00, 'EUR'),  -- Carlos's wallet
(5, 300.75, 'EUR'),   -- Ana's wallet
(6, 100.00, 'EUR');   -- Test user wallet

-- Sample wallet transactions
INSERT INTO wallet_transactions (wallet_id, transaction_type, amount, description, status) VALUES
(2, 'deposit', 500.50, 'Depósito inicial de bienvenida', 'completed'),
(3, 'deposit', 800.00, 'Transferencia bancaria', 'completed'),
(3, 'payment', -49.75, 'Compra de productos', 'completed'),
(4, 'deposit', 1200.00, 'Recarga de saldo', 'completed'),
(5, 'deposit', 350.00, 'Depósito inicial', 'completed'),
(5, 'payment', -49.25, 'Compra de libro', 'completed'),
(6, 'deposit', 100.00, 'Saldo de prueba', 'completed');
