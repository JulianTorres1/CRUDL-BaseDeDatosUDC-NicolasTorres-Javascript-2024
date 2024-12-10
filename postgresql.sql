CREATE TABLE Vehiculos (
    num_bastidor VARCHAR(50) NOT NULL,
    nombre_modelo VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descuento DECIMAL(10, 2) NOT NULL,
    potencia_fiscal INT NOT NULL,
    cilindrada INT NOT NULL,
    en_stock BOOLEAN NOT NULL,
    id_concesionario INT NOT NULL,
    id_servicio INT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (num_bastidor)
);