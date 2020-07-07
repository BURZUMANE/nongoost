const Joi = require("joi");
const contactModel = require("./contact.model");

class ContactControler {
  async createContact(req, res, next) {
    try {
      const contact = await contactModel.create(req.body);
      return res.status.json(user);
    } catch (err) {
      next(err);
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

  getContacts(req,res) {
    console.log('object')
    return res.send('fart')
  }
  getContact() {}
  deleteContact() {}
  validateUpdateContact() {}
  updateContact() {}
}

module.exports = new ContactControler();
