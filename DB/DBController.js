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

export async function showOne(table, num_bastidor) {
    try {
        // Consulta para obtener el registro por num_bastidor
        const query = `SELECT * FROM ${table} WHERE num_bastidor = $1`;
        
        // Ejecuta la consulta con el parámetro num_bastidor
        const result = await client.query(query, [num_bastidor]);

        if (result.rows.length === 0) {
            console.log(`No record found in table ${table} with id ${num_bastidor}`);
            return null; // Retorna null si no se encuentra el registro
        }

        console.log(`Showing record from table ${table} with id ${num_bastidor}`);
        console.table(result.rows); // Muestra la fila en formato tabla en la consola
        return result.rows[0]; // Devuelve el primer registro encontrado como un objeto
    } catch (err) {
        console.error(`Failed to show record from table ${table} with num_bastidor ${num_bastidor}`, err);
        throw err;
    }
}

// inserta un registro en la tabla

export async function insertRecord(table, record) {
    try {
        // Obtiene las claves y los valores del objeto record
        const keys = Object.keys(record);
        const values = Object.values(record);

        // Construye la consulta SQL con los placeholders
        const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`;

        // Ejecuta la consulta con los valores de record
        const result = await client.query(query, values);

        console.log(`Record inserted into table ${table}`);
        console.table(result.rows); // Muestra la fila insertada en formato tabla en la consola
        return result.rows[0]; // Devuelve el registro insertado como un objeto
    } catch (err) {
        console.error(`Failed to insert record into table ${table}`, err);
        throw err;
    }
}

export async function updateRecord(table, num_bastidor, record) {
    try {
        const keys = Object.keys(record);
        const values = Object.values(record);
        const query = `UPDATE ${table} SET ${keys.map((key, i) => `${key} = $${i + 1}`).join(', ')} WHERE num_bastidor = $${keys.length + 1} RETURNING *`;

        try {
            const result = await client.query(query, [...values, num_bastidor]);

            if (result.rows.length === 0) {
                console.log(`No record found in table ${table} with num_bastidor ${num_bastidor}`);
                return null; // Retorna null si no se encuentra el registro
            }

            console.log(`Record updated in table ${table} with num_bastidor ${num_bastidor}`);
            console.table(result.rows); // Muestra la fila actualizada en formato tabla en la consola
            return result.rows[0]; // Devuelve el registro actualizado como un objeto
        } catch (err) {
            console.error(`Failed to execute update query for table ${table} with num_bastidor ${num_bastidor}`, err);
            throw err;
        }
    } catch (err) {
        console.error(`Failed to update record in table ${table} with num_bastidor ${num_bastidor}`, err);
        throw err;
    }
}

export async function deleteRecord(table, num_bastidor) {
    try {
        const query = `DELETE FROM ${table} WHERE num_bastidor = $1 RETURNING *`;
        const result = await client.query(query, [num_bastidor]);

        if (result.rows.length === 0) {
            console.log(`No record found in table ${table} with num_bastidor ${num_bastidor}`);
            return null; // Retorna null si no se encuentra el registro
        }

        console.log(`Record deleted from table ${table} with num_bastidor ${num_bastidor}`);
        console.table(result.rows); // Muestra la fila eliminada en formato tabla en la consola
        return result.rows[0]; // Devuelve el registro eliminado como un objeto
    } catch (err) {
        console.error(`Failed to delete record from table ${table} with num_bastidor ${num_bastidor}`, err);
        throw err;
    }
}

export async function showTableOrderedByPriceDESC(table) {
    try {
        const query = `SELECT * FROM ${table} ORDER BY precio DESC`;
        const result = await client.query(query);

        if (result.rows.length === 0) {
            console.log(`No records found in table ${table}`);
            return []; // Retorna un array vacío si no se encuentran registros
        }

        console.log(`Showing table ${table} ordered by price`);
        console.table(result.rows); // Muestra las filas en formato tabla en la consola
        return result.rows; // Devuelve las filas de la tabla como un array de objetos
    } catch (err) {
        console.error(`Failed to show table ${table} ordered by price`, err);
        throw err;
    }
}

export async function showTableOrderedByPriceASC(table) {
    try {
        const query = `SELECT * FROM ${table} ORDER BY precio ASC`;
        const result = await client.query(query);

        if (result.rows.length === 0) {
            console.log(`No records found in table ${table}`);
            return []; // Retorna un array vacío si no se encuentran registros
        }

        console.log(`Showing table ${table} ordered by price`);
        console.table(result.rows); // Muestra las filas en formato tabla en la consola
        return result.rows; // Devuelve las filas de la tabla como un array de objetos
    } catch (err) {
        console.error(`Failed to show table ${table} ordered by price`, err);
        throw err;
    }
}