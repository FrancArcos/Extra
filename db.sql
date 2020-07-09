CREATE DATABASE aux_db IF NOT EXISTS;

USE aux_db;

CREATE TABLE IF NOT EXISTS store(
    store_id INT(11) NOT NULL,
    store_name VARCHAR(70) NOT NULL,
    PRIMARY KEY(store_id)
);

CREATE TABLE IF NOT EXISTS employee(
    employee_id INT(11) NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    employee_type TINYINT NOT NULL,
    store_id INT(11) NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (store_id) REFERENCES store(store_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS product(
    product_id INT(11) NOT NULL,
    product_name VARCHAR(255) UNIQUE NOT NULL,
    product_price FLOAT NOT NULL,
    product_duration INT(11) NOT NULL,
    product_type INT(6) NOT NULL,
    PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS user(
	user_id INT(11) NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
	user_last_name VARCHAR(255) NOT NULL,
	user_email VARCHAR(255) UNIQUE NOT NULL,
	user_address VARCHAR(255) UNIQUE NOT NULL,
	user_phone BIGINT UNIQUE NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS bag(
	bag_id INT(11) NOT NULL AUTO_INCREMENT,
	user_id INT(11) NOT NULL,
	product_id INT(11) NOT NULL,
	PRIMARY KEY (bag_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS date(
	date_id INT(11) NOT NULL AUTO_INCREMENT,
	date_created TIMESTAMP DEFAULT now(),
	date_target TIMESTAMP NOT NULL,
	user_id INT(11) NOT NULL,
	product_id INT(11) NOT NULL,
	employee_id INT(11) NOT NULL,
	store_id INT(11) NOT NULL,
	PRIMARY KEY (date_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (store_id) REFERENCES store(store_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER //
CREATE FUNCTION getRndEmployee (s_id INT)
RETURNS INT
	BEGIN
		DECLARE rndEmployee INT;
		
		selectEmployee: WHILE (TRUE) DO
			SELECT employee_id INTO rndEmployee FROM employee WHERE store_id = s_id ORDER BY RAND() LIMIT 1;
			IF (MOD(rndEmployee, 7) <> 0) THEN
				LEAVE selectEmployee;
			END IF;
		END WHILE;
		
		RETURN rndEmployee;
	END
//
DELIMITER ;

INSERT INTO store(store_id, store_name) VALUES
(1, 'Sucursal 1'),
(2, 'Sucursal 2'),
(3, 'Sucursal 3'),
(4, 'Sucursal 4');

INSERT INTO employee(employee_id, employee_name, employee_type, store_id) VALUES
(1, 'Empleado 1-1', 1, 1),
(2, 'Empleado 2-1', 1, 1),
(3, 'Empleado 3-1', 1, 1),
(4, 'Empleado 4-1', 2, 1),
(5, 'Empleado 5-1', 2, 1),
(6, 'Empleado 6-1', 2, 1),
(7, 'Gerente 1-1', 3, 1),

(8, 'Empleado 1-2', 1, 2),
(9, 'Empleado 2-2', 1, 2),
(10, 'Empleado 3-2', 1, 2),
(11, 'Empleado 4-2', 2, 2),
(12, 'Empleado 5-2', 2, 2),
(13, 'Empleado 6-2', 2, 2),
(14, 'Gerente 1-2', 3, 2),

(15, 'Empleado 1-3', 1, 3),
(16, 'Empleado 2-3', 1, 3),
(17, 'Empleado 3-3', 1, 3),
(18, 'Empleado 4-3', 2, 3),
(19, 'Empleado 5-3', 2, 3),
(20, 'Empleado 6-3', 2, 3),
(21, 'Gerente 1-3', 3, 3),

(22, 'Empleado 1-4', 1, 4),
(23, 'Empleado 2-4', 1, 4),
(24, 'Empleado 3-4', 1, 4),
(25, 'Empleado 4-4', 2, 4),
(26, 'Empleado 5-4', 2, 4),
(27, 'Empleado 6-4', 2, 4),
(28, 'Gerente 1-4', 3, 4);

INSERT INTO product(product_id, product_name, product_price, product_duration, product_type) VALUES
(1, 'Premium Makeup de día', 1400.00, 60, 1),
(2, 'Premium Makeup con aerógrafo', 1650.00, 70, 1),
(3, 'Premium Makeup de noche', 1750.00, 80, 1),
(4, 'Esmalte natural en manos', 340.00, 20, 1),
(5, 'Esmalte natural en pies', 350.00, 20, 1),
(6, 'Gel en manos', 460.00, 40, 2),
(7, 'Gel en pies', 480.00, 45, 2),
(8, 'Manicure para cabello', 500.00, 30, 2),
(9, 'Manicure', 500.00, 45, 2),
(10, 'Pedicure para caballero', 520.00, 65, 2),
(11, 'Pedicure', 520.00, 65, 2),
(12, 'Gel en manos con decoración', 580.00, 60, 2),
(13, 'Acrílico y gel en manos', 580.00, 60, 2),
(14, 'Manicure gel', 580.00, 55, 2),
(15, 'Pedicure gel', 620.00, 75, 2),
(16, 'Gel en manos y pies', 650.00, 70, 2),
(17, 'Manicure y pedicure para caballero', 720.00, 100, 2),
(18, 'Manicure y pedicure', 720.00, 120, 2),
(19, 'Manicure y pedicure gel', 880.00, 140, 2),
(20, 'Estilizado de extensiones', 140.00, 35, 3),
(21, 'Aplicación de pestañas', 210.00, 20, 3),
(22, 'Alaciado con plancha', 490.00, 50, 3),
(23, 'Modelado con secadora', 490.00, 50, 3),
(24, 'Ondas surfer', 490.00, 60, 3),
(25, 'Ondas vintage', 490.00, 60, 3),
(26, 'Peinado sencillo', 530.00, 45, 3),
(27, 'Peinado recogido', 640.00, 60, 3),
(28, 'Maquillaje de día sin pestañas', 800.00, 50, 4),
(29, 'Maquillaje de día con pestañas', 920.00, 60, 4),
(30, 'Alto peinado', 930.00, 60, 3),
(31, 'Maquillaje de noche sin pestañas', 990.00, 50, 4),
(32, 'Maquillaje de noche con pestañas', 1160.00, 60, 4),
(33, 'Paquete maquillaje de día y ondas', 1150.00, 120, 4),
(34, 'Paquete maquillaje de día y peinado recogido', 1350.00, 120, 4),
(35, 'Paquete maquillaje de noche y ondas', 1380.00, 130, 4),
(36, 'Paquete maquillaje de noche y peinado recogido', 1600.00, 130, 4),
(37, 'Corte individual', 490.00, 30, 3),
(38, 'Paquete 2 cortes', 890.00, 50, 3),
(39, 'Paquete 3 cortes', 1090.00, 70, 3),
(40, 'Paquete 4 cortes', 1190.00, 90, 3),
(41, 'Tratamiento de hidratación con Olapex', 390.00, 30, 1);
