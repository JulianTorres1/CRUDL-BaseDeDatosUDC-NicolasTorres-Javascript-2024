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
    CREATE DATABASE nombre_de_tu_base_de_datos;
    ```
3. Ejecuta el script SQL para crear las tablas necesarias:
    ```sh
    psql -U tu_usuario -d nombre_de_tu_base_de_datos -f postgresql.sql
    ```

## Ejecución del Proyecto

Para correr el proyecto en modo desarrollo, utiliza el siguiente comando:
```sh
npm run dev