const express = require("express");
const Joi = require("joi");
const { MongoClient, ObjectId } = require("mongodb");

// .env shit here
DB_CONNECTION =
  "mongodb+srv://burzumane:GjvCcBgwAS5iYdbs@cluster0.zrstr.mongodb.net/db-contacts?retryWrites=true&w=majority";
DB_NAME = "db-contacts";
// =============

let db, contacts;

const PORT = process.env.PORT || 5005;

const main = async () => {
  const app = express();
  contact = await MongoClient.connect(DB_CONNECTION, {
    useUnifiedTopology: true,
  });
  db = contact.db(DB_NAME);

  contacts = db.collection("contacts");

  app.use(express.json());

  // Routes
  app.post("/api/contacts/", validateCreateContact, createContact);
  app.get("/api/contacts/", getContacts);
  app.get("/api/contacts/:id", getContact);
  app.delete("/api/contacts/:id", deleteContact);
  app.put("/api/contacts/:id", validateUpdateContact, updateContact);

  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`),
  );
};

const validateCreateContact = (req, res, next) => {
  const createContactRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
    token: Joi.string().allow("").allow(null),
  });

  const result = Joi.validate(req.body, createContactRules);
  if (result.error) {
    return res.status(400).json({
      message: "Missing required name field",
    });
  }
  next();
};
const validateUpdateContact = (req, res, next) => {
  const createContactRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string().allow("").allow(null),
  });

  const result = Joi.validate(req.body, createContactRules);
  if (result.error) {
    return res.status(400).json({
      message: "Missing required name field",
    });
  }
  next();
};

const createContact = async (req, res, next) => {
  try {
    const newContact = await contacts.insertOne(req.body);
    res.status(201).json(newContact.ops[0]);
  } catch (err) {
    next(err);
  }
};
const updateContact = async (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Are you drunk bruv?");
  }
  try {
    const updatedContact = await contacts.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body },
    );

    if (!updatedContact.modifiedCount) {
      return res.status(404).send("Are you drunk bruv?");
    }

    console.log(updatedContact.modifiedCount);
    return res.status(200).send("good lord jesus");
  } catch (err) {
    console.log(err);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contactList = await contacts.find().toArray();
    res.status(201).json(contactList);
  } catch (err) {
    console.log(err);
  }
};
const getContact = async (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Are you drunk bruv?");
  }
  try {
    const contact = await contacts.findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res.status(404).send("Are you drunk bruv?");
    }
    res.status(201).json(contact);
  } catch (err) {
    console.log(err);
  }
};
const deleteContact = async (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Are you drunk bruv?");
  }
  try {
    const contact = await contacts.deleteOne({ _id: new ObjectId(id) });
    if (!contact.deletedCount) {
      return res.status(404).send("Are you drunk bruv?");
    }
    return res.status(204).send("You got rid of that shit");
  } catch (err) {
    console.log(err);
  }
};

main();
