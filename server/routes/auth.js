const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const registerValidation = require("../validations/registervalidations");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, mobile, email, password, confirmedpassword, com_name } = req.body;

  // Validate fields
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  try {
    // Check if email or mobile already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: `"email" already exists`
      });
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: `"mobile" already exist`
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      confirmedpassword,
      com_name,
    });

    await user.save();

    res.status(201).json({
      StatusCodes: "00",
      responsed: {
        clientId: user._id,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
