import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "./db";
import dotenv from "dotenv";

dotenv.config();
const collection = process.env.COLLECTION_NAME;
const db_name = process.env.DB_NAME;

export const db = getDbConnection(db_name);

export async function createUser(email, password, phone, userName) {
  const user = await db.collection(collection).findOne({ email });
  console.log("=========================================");
  console.log(user ? "tem" : "tem, mas acabou");
  console.log("=========================================");

  if (user) {
    res.sendStatus(409);
  }

  const salt = uuid();
  const pepper = process.env.PEPPER_STRING;

  const passwordHash = await bcrypt.hash(salt + password + pepper, 10);

  const verificationString = uuid();

  const startingInfo = {
    orders: [],
  };
  console.log(email, password, phone, userName);

  const result = await db.collection(collection).insertOne({
    email,
    phone,
    userName,
    passwordHash,
    salt,
    info: startingInfo,
    isVerified: false,
    verificationString,
  });
  return result;
}

export async function getUser(param) {
  return await db.collection(collection).findOne({ param });
}
export async function updateUser(param) {
  const db = getDbConnection(db_name);
  const existingUser = await db.collection(collection).findOne({ email });

  if (existingUser) {
    const result = await db
      .collection(collection)
      .findOneAndUpdate(
        { email },
        { $set: { googleId, isVerified } },
        { returnOriginal: false }
      );
    return result.value;
  } else {
    const result = await db.collection(collection).insertOne({
      email,
      googleId,
      isVerified,
      info: {},
    });
    return result.ops[0];
  }
}
export async function verificationUser(param) {}
