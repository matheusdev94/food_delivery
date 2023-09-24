import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { getDbConnection } from "../database/db";
import { sendEmail } from "../utils/sendEmail";

const collection = process.env.COLLECTION_NAME;
const db_name = process.env.DB_NAME;

export const signUp = {
  path: "/user/signup",
  method: "post",
  handler: async (req, res) => {
    console.log(
      `::::::::::::::::::::::::::::::::::::::::::::::::::
      ::::::::::::::::::::::SINGUP::::::::::::::::::::::
      ::::::::::::::::::::::::::::::::::::::::::::::::::`
    );
    const { email, password, phone, userName } = req.body;
    const db = getDbConnection(db_name);
    const user = await db.collection(collection).findOne({ email });
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
    const { insertedId } = result;
    console.log("im getted wwhat you wanted? ", insertedId);
    try {
      await sendEmail({
        to: email,
        from: process.env.ADM_EMAIL,
        subject: "Please verify your email",
        text: `
              Thanks for signing up! To verify your email, click here:
              http://localhost:3000/verify-email/${verificationString}
          `,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }

    //generating jwt
    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(token);
        res.status(200).json({ token });
      }
    );
    // res.status(200).json({ token });
  },
};
