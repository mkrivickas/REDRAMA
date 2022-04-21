const express = require("express");


const {
    registerUser,
} = require("./../controllers/registrationController");

const router = express.Router();

router.route("/").post(registerUser);

module.exports = router;