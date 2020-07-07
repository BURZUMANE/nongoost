const { Router } = require("express");
const ContactControler = require("./controler");
const contactRouter = Router();

contactRouter.post(
  "/",
  ContactControler.validateCreateContact,
  ContactControler.createContact,
);
contactRouter.get("/", ContactControler.getContacts);
contactRouter.get(
  "/:id",
  ContactControler.validateId,
  ContactControler.getContact,
);
contactRouter.delete(
  "/:id",
  ContactControler.validateId,
  ContactControler.deleteContact,
);
contactRouter.put(
  "/:id",
  ContactControler.validateId,
  ContactControler.validateUpdateContact,
  ContactControler.updateContact,
);

module.exports = contactRouter;
