import { connectToDatabase, showTable, showOne } from './DB/DBController.js';

(async () => {
    const client = await connectToDatabase();
})();

(async () => {
    // await showTable('vehiculos');
    await showOne('vehiculos', 1);
})();

