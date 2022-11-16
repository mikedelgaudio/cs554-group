import { Db, MongoClient } from "mongodb";

const MONGO_URL = process.env?.MONGO_URL ?? "mongodb://localhost:27017/";
const MONGO_DB_NAME = process.env?.MONGO_DB_NAME ?? "CS554-Group-DB";

export async function connectToDb(): Promise<Db | undefined> {
  try {
    let connection: MongoClient | undefined;

    if (!connection) {
      connection = await MongoClient.connect(MONGO_URL);
    }
    return connection?.db(MONGO_DB_NAME);
  } catch (e) {
    console.error("Error when connecting to mongo ", e);
  }
}
