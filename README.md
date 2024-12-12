# CRUDL-BaseDeDatosUDC-NicolasTorres-Javascript-2024

Este es un programa tipo CRUDL básico como parte de la unidad #4 de la asignatura de base de datos 1 de la Universidad de Cartagena.

## Requisitos

- Node.js
- PostgreSQL

## Instalación

1. Clona el repositorio:

    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd crudl-basededatosudc-nicolastorres-javascript-2024
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

## Configuración de la Base de Datos

1. Asegúrate de tener PostgreSQL instalado y en funcionamiento.
2. Crea una base de datos en PostgreSQL:

    ```sql
    CREATE DATABASE Concesionarios;
    ```

3. Ejecuta el script SQL para crear las tablas necesarias:

    ```sql
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
    ```

## Ejecución del Proyecto

Para correr el proyecto en modo desarrollo, utiliza el siguiente comando:

```sh
npm run dev
