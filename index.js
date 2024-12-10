import { connectToDatabase } from './components/DB/DBController.js';

(async () => {
    const isConnected = await connectToDatabase();
})();