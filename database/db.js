const { Pool } = require("pg");

console.log(process.env.DATABASE_HOST);
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true,
});

const userAdd = (name, email, machineId, token) => {
  pool.query(
    "INSERT INTO users (name, email, machine_id, token) VALUES ($1, $2, $3, $4)",
    [name, email, machineId, token],
    (err, res) => {
      if (err) {
        console.error("error inserting data: ", err);
      } else {
        console.log("data inserted successfully");
      }
    },
  );
};

const userGetByMachineId = async (machineId) => {
  const res = await pool.query(
    "SELECT email, token, name FROM users WHERE machine_id = $1",
    [machineId],
  );

  return res.rows[0];
};

const isMachineIdExist = async (machineId) => {
  const res = await pool.query(
    "SELECT machine_id FROM users WHERE machine_id = $1",
    [machineId],
  );

  if (res.rows.length > 0) {
    return true;
  }

  return false;
};

// userGetByMachineId('machine123e')
// console.log(isMachineIdExist('machine123'))
module.exports = { userAdd, userGetByMachineId, isMachineIdExist };
