const db = require("../config/db");

// GET salary calculations
exports.getSalaryCalculation = (req, res) => {
  const sql = "SELECT * FROM salary";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("MYSQL ERROR:", err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// POST salary calculation
exports.addSalaryCalculation = (req, res) => {
  console.log("========== SALARY API CALLED ==========");
  console.log("REQUEST BODY:", req.body);

  const {
    employee_id,
    basic_salary,
    hra,
    allowances,
    deductions
  } = req.body || {};

  // employee_id is NOT NULL in the salary table: without this guard an empty
  // form field reaches MySQL as NULL and the insert fails with a 500.
  if (employee_id === undefined || employee_id === null || employee_id === '') {
    return res.status(400).json({
      success: false,
      message: "employee_id is required",
    });
  }

  if (basic_salary === undefined || basic_salary === null || basic_salary === '') {
    return res.status(400).json({
      success: false,
      message: "basic_salary is required",
    });
  }

  const net_salary =
    Number(basic_salary || 0) +
    Number(hra || 0) +
    Number(allowances || 0) -
    Number(deductions || 0);

  console.log("NET SALARY:", net_salary);

  const sql = `
    INSERT INTO salary
    (
      employee_id,
      basic_salary,
      hra,
      allowances,
      deductions,
      net_salary
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      employee_id,
      basic_salary,
      hra || 0,
      allowances || 0,
      deductions || 0,
      net_salary,
    ],
    (err, result) => {
      if (err) {
        console.log("MYSQL ERROR:", err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      console.log("INSERT SUCCESS:", result.insertId);

      return res.status(201).json({
        success: true,
        message: "Salary saved successfully",
        salary_id: result.insertId,
        net_salary: net_salary,
      });
    }
  );
};