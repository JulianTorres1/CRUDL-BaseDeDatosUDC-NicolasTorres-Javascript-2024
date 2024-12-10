const { Client } = require('pg');

const dbConfig = {
    user: 'root',
    host: 'localhost',
    database: 'postgres',
    password: 'Delfin23',
    port: 5432,
};

export async function connectToDatabase() {
    const client = new Client(dbConfig);

    try {
        await client.connect();
        console.log('Connected to the database successfully');
        return true;
    } catch (err) {
        console.error('Failed to connect to the database', err);
        return false;
    } finally {
        await client.end();
    }
}
