const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
require("dotenv/config");

// const uri = process.env.DB_USERNAME;
// const dbName = process.env.DATABASE_URL;

const uri =
  "mongodb+srv://shopNowDB:shopPassword@cluster0.jodeykj.mongodb.net/shopNowDB?retryWrites=true&w=majority";
const dbName = "shopNowDB";

const client = new MongoClient(uri);

client.connect(async (err) => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db(dbName);

  try {
    const collectionNames = await db.listCollections().toArray();

    for (const collectionInfo of collectionNames) {
      const collectionName = collectionInfo.name;
      const data = await db.collection(collectionName).find({}).toArray();
      const backupFileName = `backup_${collectionName}.json`;

      fs.writeFileSync(backupFileName, JSON.stringify(data, null, 2));
      console.log(`Backup of ${collectionName} saved as ${backupFileName}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
});
