const mongodb = require("mongodb");
const { MongoClient, ObjectId } = mongodb;
DB_CONNECTION =
  "mongodb+srv://burzumane:GjvCcBgwAS5iYdbs@cluster0.zrstr.mongodb.net/db-contacts?retryWrites=true&w=majority";
DB_NAME = "db-contacts";

const main = async () => {
  const contact = await MongoClient.connect(DB_CONNECTION, {
    useUnifiedTopology: true,
  });
  console.log("Congrats comrad we got connected to kremlin");

  const db = contact.db(DB_NAME);
  const contacts = db.collection("contacts");
  console.log(
    // await contacts.findOne({ _id: new ObjectId("5eb074232c30a1378dacdbdb") })
    await contacts.find({name:"Allen Raymond"}).toArray(),
  );
};

main();
