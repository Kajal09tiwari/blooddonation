const express = require("express");
const router = express.Router();
const Recipient = require("../models/Recipient");
const RecipientProfile = require("../models/RecipientProfile");


router.post("/", async (req, res) => {
    try {
      const newRecipient = new RecipientProfile(req.body);
      await newRecipient.save();
      res.status(201).json(newRecipient); // ✅ Send full recipient with _id
    } catch (err) {
      console.error("❌ Error saving recipient:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  



module.exports = router;
