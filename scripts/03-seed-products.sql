-- Inserting comprehensive product catalog with realistic data
-- Seed Products Data - Comprehensive E-commerce Catalog
INSERT INTO products (name, description, price, stock, category_id, image_url, sku, weight, dimensions) VALUES

-- Electrónicos (category_id: 1)
('Laptop Gaming ROG Strix', 'Laptop gaming de alto rendimiento con RTX 4070, 16GB RAM, SSD 1TB', 1299.99, 15, 1, '/images/products/laptop-gaming.jpg', 'ELEC-LAP-001', 2.5, '35.5 x 25.9 x 2.7 cm'),
('iPhone 15 Pro Max', 'Smartphone Apple con chip A17 Pro, cámara de 48MP, 256GB', 1199.99, 25, 1, '/images/products/iphone-15.jpg', 'ELEC-PHO-002', 0.221, '16.0 x 7.7 x 0.8 cm'),
('Samsung Galaxy S24 Ultra', 'Smartphone Android premium con S Pen, 512GB', 1099.99, 20, 1, '/images/products/samsung-s24.jpg', 'ELEC-PHO-003', 0.232, '16.3 x 7.9 x 0.9 cm'),
('MacBook Air M3', 'Laptop ultradelgada con chip M3, 16GB RAM, 512GB SSD', 1499.99, 12, 1, '/images/products/macbook-air.jpg', 'ELEC-LAP-004', 1.24, '30.4 x 21.5 x 1.1 cm'),
('AirPods Pro 2', 'Auriculares inalámbricos con cancelación de ruido activa', 249.99, 50, 1, '/images/products/airpods-pro.jpg', 'ELEC-AUD-005', 0.056, '6.1 x 4.5 x 2.1 cm'),
('Sony WH-1000XM5', 'Auriculares over-ear con la mejor cancelación de ruido', 399.99, 30, 1, '/images/products/sony-headphones.jpg', 'ELEC-AUD-006', 0.250, '26.4 x 19.5 x 7.3 cm'),
('iPad Pro 12.9"', 'Tablet profesional con chip M2, 128GB, WiFi + Cellular', 1099.99, 18, 1, '/images/products/ipad-pro.jpg', 'ELEC-TAB-007', 0.682, '28.1 x 21.5 x 0.6 cm'),
('Nintendo Switch OLED', 'Consola de videojuegos híbrida con pantalla OLED', 349.99, 40, 1, '/images/products/nintendo-switch.jpg', 'ELEC-GAM-008', 0.420, '24.2 x 10.2 x 1.4 cm'),

-- Ropa y Moda (category_id: 2)
('Camiseta Nike Dri-FIT', 'Camiseta deportiva de alta tecnología, 100% poliéster', 29.99, 100, 2, '/images/products/nike-shirt.jpg', 'FASH-SHI-009', 0.150, 'Talla: S, M, L, XL'),
('Jeans Levi\'s 501 Original', 'Jeans clásicos de mezclilla 100% algodón', 89.99, 75, 2, '/images/products/levis-jeans.jpg', 'FASH-PAN-010', 0.600, 'Tallas: 28-38'),
('Zapatillas Adidas Ultraboost', 'Zapatillas running con tecnología Boost', 180.99, 60, 2, '/images/products/adidas-ultraboost.jpg', 'FASH-SHO-011', 0.340, 'Tallas: 36-46'),
('Chaqueta North Face', 'Chaqueta impermeable para outdoor y montañismo', 199.99, 35, 2, '/images/products/northface-jacket.jpg', 'FASH-JAC-012', 0.450, 'Tallas: S, M, L, XL'),
('Vestido Zara Elegante', 'Vestido de noche elegante, 95% poliéster, 5% elastano', 79.99, 45, 2, '/images/products/zara-dress.jpg', 'FASH-DRE-013', 0.200, 'Tallas: XS, S, M, L'),
('Reloj Casio G-Shock', 'Reloj deportivo resistente al agua, multifunción', 129.99, 25, 2, '/images/products/casio-watch.jpg', 'FASH-WAT-014', 0.070, '5.5 x 4.8 x 1.6 cm'),

-- Hogar y Jardín (category_id: 3)
('Sofá Modular IKEA', 'Sofá de 3 plazas modular, tapizado en tela gris', 599.99, 8, 3, '/images/products/ikea-sofa.jpg', 'HOME-FUR-015', 45.0, '218 x 88 x 88 cm'),
('Cafetera Nespresso', 'Máquina de café espresso automática con espumador', 199.99, 22, 3, '/images/products/nespresso.jpg', 'HOME-APP-016', 4.2, '37.1 x 28.9 x 32.1 cm'),
('Aspiradora Dyson V15', 'Aspiradora inalámbrica con tecnología láser', 749.99, 15, 3, '/images/products/dyson-vacuum.jpg', 'HOME-APP-017', 3.1, '126.7 x 25.0 x 23.2 cm'),
('Set Cuchillos Wüsthof', 'Set profesional de 6 cuchillos alemanes', 299.99, 20, 3, '/images/products/wusthof-knives.jpg', 'HOME-KIT-018', 1.8, '35 x 20 x 5 cm'),
('Plantas Decorativas Set', 'Set de 3 plantas de interior con macetas', 89.99, 30, 3, '/images/products/plants-set.jpg', 'HOME-DEC-019', 2.5, 'Macetas: 15, 20, 25 cm'),

-- Deportes (category_id: 4)
('Bicicleta Trek Mountain', 'Bicicleta de montaña con 21 velocidades', 899.99, 10, 4, '/images/products/trek-bike.jpg', 'SPOR-BIK-020', 13.5, '180 x 110 x 70 cm'),
('Pesas Ajustables 40kg', 'Set de pesas ajustables para entrenamiento en casa', 299.99, 25, 4, '/images/products/adjustable-weights.jpg', 'SPOR-WEI-021', 40.0, '45 x 20 x 20 cm'),
('Pelota Fútbol FIFA', 'Balón oficial FIFA para fútbol profesional', 49.99, 80, 4, '/images/products/fifa-ball.jpg', 'SPOR-BAL-022', 0.410, 'Circunferencia: 68-70 cm'),
('Raqueta Tenis Wilson', 'Raqueta profesional de tenis, peso 300g', 159.99, 35, 4, '/images/products/wilson-racket.jpg', 'SPOR-RAC-023', 0.300, '68.5 x 26.7 cm'),

-- Libros (category_id: 5)
('Clean Code - Robert Martin', 'Libro sobre mejores prácticas en programación', 49.99, 100, 5, '/images/products/clean-code.jpg', 'BOOK-TEC-024', 0.680, '23.5 x 19.1 x 3.2 cm'),
('El Quijote - Cervantes', 'Edición especial de la obra maestra española', 29.99, 150, 5, '/images/products/quijote.jpg', 'BOOK-LIT-025', 0.890, '24 x 16 x 4 cm'),
('Sapiens - Yuval Harari', 'Bestseller sobre la historia de la humanidad', 24.99, 200, 5, '/images/products/sapiens.jpg', 'BOOK-HIS-026', 0.520, '23.4 x 15.3 x 2.8 cm'),

-- Salud y Belleza (category_id: 6)
('Crema Facial L\'Oréal', 'Crema anti-edad con ácido hialurónico', 39.99, 60, 6, '/images/products/loreal-cream.jpg', 'BEAU-CRE-027', 0.050, '6 x 6 x 4 cm'),
('Perfume Chanel No. 5', 'Fragancia clásica femenina, 100ml', 149.99, 25, 6, '/images/products/chanel-perfume.jpg', 'BEAU-PER-028', 0.180, '10.5 x 5.5 x 5.5 cm'),
('Vitaminas Multivitamínico', 'Suplemento diario con 25 vitaminas y minerales', 19.99, 120, 6, '/images/products/multivitamin.jpg', 'HEAL-VIT-029', 0.200, '12 x 6 x 6 cm'),

-- Juguetes (category_id: 7)
('LEGO Creator Expert', 'Set de construcción avanzado 2000+ piezas', 199.99, 30, 7, '/images/products/lego-creator.jpg', 'TOYS-LEG-030', 2.1, '48 x 37.8 x 7.1 cm'),
('Muñeca Barbie Dreamhouse', 'Casa de muñecas con 3 pisos y accesorios', 299.99, 15, 7, '/images/products/barbie-house.jpg', 'TOYS-DOL-031', 8.5, '116 x 71 x 33 cm'),

-- Automóviles (category_id: 8)
('Neumáticos Michelin', 'Set de 4 neumáticos 205/55R16', 399.99, 20, 8, '/images/products/michelin-tires.jpg', 'AUTO-TIR-032', 36.0, '63.2 x 63.2 x 20.5 cm'),
('Aceite Motor Castrol', 'Aceite sintético 5W-30, 5 litros', 49.99, 50, 8, '/images/products/castrol-oil.jpg', 'AUTO-OIL-033', 4.5, '25 x 18 x 12 cm'),

-- Mascotas (category_id: 9)
('Comida Premium Perros', 'Alimento balanceado para perros adultos, 15kg', 79.99, 40, 9, '/images/products/dog-food.jpg', 'PETS-FOO-034', 15.0, '60 x 40 x 15 cm'),
('Juguete Interactivo Gatos', 'Torre de juegos con pelotas y rascador', 59.99, 25, 9, '/images/products/cat-toy.jpg', 'PETS-TOY-035', 2.8, '35 x 35 x 40 cm'),

-- Oficina (category_id: 10)
('Silla Ergonómica Herman Miller', 'Silla de oficina premium con soporte lumbar', 899.99, 12, 10, '/images/products/herman-miller.jpg', 'OFFI-CHA-036', 18.5, '68 x 68 x 104 cm'),
('Monitor 4K Dell 27"', 'Monitor profesional UltraSharp 4K IPS', 449.99, 18, 10, '/images/products/dell-monitor.jpg', 'OFFI-MON-037', 6.2, '61.1 x 36.6 x 5.5 cm');
