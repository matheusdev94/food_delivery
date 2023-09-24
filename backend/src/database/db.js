import { MongoClient } from "mongodb";

let client;
const uri = "mongodb://localhost:27017";

// const dbPath = "../../db";

export const initializeDbConnection = async () => {
  client = await MongoClient.connect(`${uri}`, {
    // client = await MongoClient.connect(`${uri}?dbpath=${dbPath}`, { TODO
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
