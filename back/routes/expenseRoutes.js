const express = require("express");


const {
    addExpense, getAllExpense
} = require("./../controllers/expenseController");

const router = express.Router();

router.route("/").post(addExpense).get(getAllExpense);

module.exports = router;