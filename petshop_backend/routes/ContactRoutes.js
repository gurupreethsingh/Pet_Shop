const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/ContactController");

// Route to add a contact message
router.post("/add-contact-message", ContactController.addContactMessage);

module.exports = router;
