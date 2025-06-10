const conn = require("../config/db.config.cjs");
const addMake = async (req, res) => {
  const connection = await conn.getConnection();
  const { make } = req.body;
  try {
    await connection.query("CALL proc_insert_make(?)", [make]);
    return res.status(200).json({ message: "Make Submitted Successfully!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const getMake = async (req, res) => {
  const connection = await conn.getConnection();
  try {
    const [rows] = await connection.query("CALL proc_car_make()");
    return res.status(200).json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const deleteMake = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  try {
    await connection.query("CALL proc_delete_Make(?)", [id]);
    return res.status(200).json({ message: "Make deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const updateMake = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  const { make } = req.body;
  try {
    await connection.query("CALL proc_update_make(?,?)", [id, make]);
    return res.status(200).json({ message: "Make Updated!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
module.exports = {
  addMake,
  getMake,
  deleteMake,
  updateMake,
};
