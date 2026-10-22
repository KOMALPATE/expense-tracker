const mysql = require("mysql2");

// createPool instead of createConnection: a single connection dies permanently
// when MySQL closes it (idle wait_timeout, server restart) and every later
// query then fails with PROTOCOL_CONNECTION_LOST / "Cannot enqueue Query after
// fatal error". A pool re-opens connections automatically.
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Creditt@123",
  database: "calculation",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("MYSQL CONNECTION ERROR:", err);
  } else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});

module.exports = db;
