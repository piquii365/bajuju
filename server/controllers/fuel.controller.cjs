const conn = require("../config/db.config.cjs");
const getFuel = async (req, res) => {
  const connection = await conn.getConnection();
  try {
    const [rows] = await connection.query("CALL proc_fuel()");
    return res.status(200).json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
module.exports = { getFuel };
