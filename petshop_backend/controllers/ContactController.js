const ContactModel = require("../models/ContactModel");
const nodemailer = require("nodemailer");


// Controller to add a contact message
exports.addContactMessage = async (req, res) => {
    // Change made here
    try {
      const { firstName, lastName, email, phone, message_text, agreeToLicense } =
        req.body;
  
      if (!email || !firstName || !lastName || !message_text) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const newContactMessage = new ContactModel({
        firstName,
        lastName,
        email,
        phone,
        message_text,
        agreeToLicense,
      });
  
      await newContactMessage.save();
      res
        .status(201)
        .json({ message: "Contact message successfully submitted!" });
    } catch (error) {
      console.error("Error saving contact message:", error);
      res.status(500).json({
        error: "An error occurred while submitting the contact message.",
      });
    }
  };