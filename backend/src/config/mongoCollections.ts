import { Collection } from "mongodb";
import { connectToDb } from "./mongoConnection";

const getCollectionFn = (collection: string) => {
  try {
    let _col: Collection<Document> | undefined;

    return async () => {
      if (!_col) {
        const db = await connectToDb();
        _col = db?.collection(collection);
      }

      return _col;
    };
  } catch (e) {
    console.error(`Error when connecting to collection ${collection}`, e);
  }
};

module.exports = {
  users: getCollectionFn("users"),
};
