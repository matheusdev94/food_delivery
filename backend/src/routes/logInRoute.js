import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { getDbConnection } from "./db";
import { getDbConnection } from "../database/db";
import dotenv from "dotenv";

dotenv.config();
const collection = process.env.COLLECTION_NAME;
const db_name = process.env.DB_NAME;

export const logIn = {
  path: "/user/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    // const db = getDbConnection("food_delivery");
    const db = getDbConnection(db_name);
    // const user = await db.collection("users").findOne({ email });
    const user = await db.collection(collection).findOne({ email });

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash, salt, info } = user;
    const pepper = process.env.PEPPER_STRING;

    const isCorrect = await bcrypt.compare(
      salt + password + pepper,
      passwordHash
    );

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.sendStatus(500);
          }
          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }
  },
};
