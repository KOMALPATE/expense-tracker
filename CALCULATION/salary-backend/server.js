const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);

app.use(express.json());

const salaryRoutes = require("./routes/salaryRoutes");

app.use("/api", salaryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
