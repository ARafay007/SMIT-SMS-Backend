
import { MongoClient } from 'mongodb'

export let dbo;

export async function connectDB(){
    try{
        const client = new MongoClient(process.env.MONGO_DB_CONNECTION);

        await client.connect();

        dbo = client.db('practice_db');

        console.log('Connected to MongoDB');
    }
    catch(error){
        console.error(error);
    }
}