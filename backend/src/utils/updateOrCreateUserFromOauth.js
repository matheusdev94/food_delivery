import { getDbConnection } from "../database/db";

const collection = process.env.COLLECTION_NAME;
const db_name = process.env.DB_NAME;

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;

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
};
