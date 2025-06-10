const conn = require("../config/db.config.cjs");
const addAccessory = async (req, res) => {
  const connection = await conn.getConnection();
  const { accessory } = req.body;
  try {
    await connection.query("CALL proc_insert_accessory(?)", [accessory]);
    return res
      .status(200)
      .json({ message: "Accessory Submitted Successfully!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const getAccessories = async (req, res) => {
  const connection = await conn.getConnection();
  try {
    const [rows] = await connection.query("CALL proc_car_accessories()");
    return res.status(200).json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const deleteAccessory = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  try {
    await connection.query("CALL proc_delete_accessory(?)", [id]);
    return res.status(200).json({ message: "Accessory deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const updateAccessory = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  const { accessory } = req.body;
  try {
    await connection.query("CALL proc_update_accessories(?,?)", [
      id,
      accessory,
    ]);
    return res.status(200).json({ message: "Accessory Updated!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
module.exports = {
  addAccessory,
  getAccessories,
  deleteAccessory,
  updateAccessory,
};
