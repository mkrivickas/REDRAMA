const express = require("express");


const {
    addExpense,
} = require("./../controllers/expenseController");

const router = express.Router();

router.route("/").post(addExpense);

module.exports = router;