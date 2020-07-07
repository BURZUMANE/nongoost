const Joi = require("joi");
const contactModel = require("./model");
const { Types:{ObjectId} } = require("mongoose");
class ContactControler {
  async createContact(req, res, next) {
    console.log("object");
    try {
      const contact = await contactModel.create(req.body);
      return res.status(201).json(contact);
    } catch (err) {
      console.log(err);
    }
  }
  validateCreateContact(req, res, next) {
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
  }

  async getContacts(req, res, next) {
    try {
      const contacts = await contactModel.find();
      return res.status(200).json(contacts);
    } catch (err) {
      console.log(err);
    }
  }
  async getContact(req, res, next) {
    const id = req.params.id;
    try {
      const contact = await contactModel.findOne({ _id: id });
      if (!contact) {
        return res.status(404).send("Are you drunk bruv?");
      }
      res.status(201).json(contact);
    } catch (err) {
      console.log(err);
    }
  }

  validateId(req,res, next){
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send("Are you drunk bruv?");
      }

    next()
  }
  deleteContact() {}
  validateUpdateContact() {}
  updateContact() {}
}

module.exports = new ContactControler();
