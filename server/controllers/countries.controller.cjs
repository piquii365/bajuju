const conn = require("../config/db.config.cjs");
const addCountry = async (req, res) => {
  const connection = await conn.getConnection();
  const { country } = req.body;
  try {
    await connection.query("CALL proc_insert_country(?)", [country]);
    return res.status(200).json({ message: "Country Submitted Successfully!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const getCountries = async (req, res) => {
  const connection = await conn.getConnection();
  try {
    const [rows] = await connection.query("CALL proc_countries()");
    return res.status(200).json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const deleteCountry = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  try {
    await connection.query("CALL proc_delete_country(?)", [id]);
    return res.status(200).json({ message: "Country deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const updateCountry = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  const { country } = req.body;
  try {
    await connection.query("CALL proc_update_country(?,?)", [id, country]);
    return res.status(200).json({ message: "Country Updated!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
module.exports = {
  addCountry,
  getCountries,
  deleteCountry,
  updateCountry,
};
