const conn = require("../config/db.config.cjs");
const addCategory = async (req, res) => {
  const connection = await conn.getConnection();
  const { category } = req.body;
  try {
    await connection.query("CALL proc_insert_category(?)", [category]);
    return res
      .status(200)
      .json({ message: "Category Submitted Successfully!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const getCategories = async (req, res) => {
  const connection = await conn.getConnection();
  try {
    const [rows] = await connection.query("CALL proc_car_category()");
    return res.status(200).json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const deleteCategory = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  try {
    await connection.query("CALL proc_delete_category(?)", [id]);
    return res.status(200).json({ message: "Category deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const updateCategory = async (req, res) => {
  const connection = await conn.getConnection();
  const { id } = req.params;
  const { category } = req.body;
  try {
    await connection.query("CALL proc_update_category(?,?)", [id, category]);
    return res.status(200).json({ message: "Category Updated!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
