import pkg from 'pg'; // Importa el paquete completo
const { Client } = pkg;

const dbConfig = {
    user: 'root',
    host: 'localhost',
    database: 'Concesionarios',
    password: 'Delfin23',
    port: 5432,
};

const client = new Client(dbConfig);

export async function connectToDatabase() {

    try {
        await client.connect();
        console.log('Connected to the database successfully');
        return client; // Devuelve el cliente para seguir usándolo
    } catch (err) {
        console.error('Failed to connect to the database', err);
        throw err;
    }
}

export function jsonToTable(jsonData) {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
        console.log('No data available to display');
        return;
    }

    const headers = Object.keys(jsonData[0]);
    const table = [headers.join('\t')];

    jsonData.forEach(row => {
        const values = headers.map(header => row[header]);
        table.push(values.join('\t'));
    });

    console.log(table.join('\n'));
}

// CRUDL operations

export async function showTable(table) {
    try {
        const result = await client.query(`SELECT * FROM ${table}`);
        console.log(`Showing table ${table}`);
        console.table(result.rows); // Muestra las filas en formato tabla en la consola
        return result.rows; // Devuelve las filas de la tabla como un array de objetos
    } catch (err) {
        console.error('Failed to show table', err);
        throw err;
    }
}

export async function showOne(table, id) {
    try {
        // Consulta para obtener el registro por id
        const query = `SELECT * FROM ${table} WHERE id = $1`;
        
        // Ejecuta la consulta con el parámetro id
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            console.log(`No record found in table ${table} with id ${id}`);
            return null; // Retorna null si no se encuentra el registro
        }

        console.log(`Showing record from table ${table} with id ${id}`);
        console.table(result.rows); // Muestra la fila en formato tabla en la consola
        return result.rows[0]; // Devuelve el primer registro encontrado como un objeto
    } catch (err) {
        console.error(`Failed to show record from table ${table} with id ${id}`, err);
        throw err;
    }
}
