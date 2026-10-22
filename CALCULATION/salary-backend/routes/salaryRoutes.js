const express = require("express");

const router = express.Router();

const salarycontroller = require("../controllers/salaryController");

router.get(
  "/salary-calculation",
  salarycontroller.getSalaryCalculation
);

router.post(
  "/salary",
  salarycontroller.addSalaryCalculation
);

module.exports = router;