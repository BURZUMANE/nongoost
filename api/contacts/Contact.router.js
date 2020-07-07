const { Router } = require("express");
const contactControler = require("./Contact.controler");

const contactRouter = Router();
contactRouter.post(
  "/api/contacts/",
  contactControler.validateCreateContact,
  contactControler.createContact,
);
contactRouter.get("/api/contacts/", contactControler.getContacts);
contactRouter.get("/api/contacts/:id", contactControler.getContact);
contactRouter.delete("/api/contacts/:id", contactControler.deleteContact);
contactRouter.put(
  "/api/contacts/:id",
  contactControler.validateUpdateContact,
  contactControler.updateContact,
);
contactRouter.get("/", (req, res) => {
  console.log("object");
  // return res.status(200);
});
module.exports = contactRouter;
