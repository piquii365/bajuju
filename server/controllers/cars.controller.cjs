const conn = require("../config/db.config.cjs");
const addCar = async (req, res) => {
  const connection = await conn.getConnection();
  try {
    const {
      make,
      model,
      priceWithInspection,
      priceWithoutInspection,
      country,
      description,
      year,
      engine,
      milage,
      transmission,
      fuel,
      drive,
      accessories,
    } = req.body;
    const images = [];
    if (!req.files)
      return res.status(500).json({ message: "No Car Images Found!" });
    req.files.foreach((file) => images.push(file.filename));
    await connection.query("CALL sp_insert_car(?,?,?,?,?,?,?,?,?,?,?,?,?)", [
      images.join(","),
      make,
      model,
      priceWithInspection,
      priceWithoutInspection,
      description,
      country,
      year,
      engine,
      transmission,
      fuel,
      drive,
      accessories,
    ]);
    return res.status(200).json({ message: " Car Uploaded!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};
const getCars = async (req, res) => {
  const connection = await conn.getConnection();
  try {
    const {
      country,
      transmission,
      category,
      fuel,
      drive,
      page_number = 1,
      page_size = 10,
    } = req.query;
    const [rows] = await connection.query(
      "CALL proc_get_cars(?,?,?,?,?,?,?, @p_count)",
      [
        country || null,
        transmission || null,
        category || null,
        fuel || null,
        drive || null,
        parseInt(page_number, 10),
        parseInt(page_size, 10),
      ]
    );
    const [[{ count }]] = await connection.query("SELECT @p_count AS count");
    return res.status(200).json({
      cars: rows[0],
      total: count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};
const getCarById = async (req, res) => {
  const { id } = req.params;
  const connection = await conn.getConnection();
  try {
    const [rows] = await connection.query("CALL proc_get_car_by_id(?)", [id]);
    return res.status(200).json(rows[0][0]);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  } finally {
    connection.release();
  }
};
const getSimilarCars = async (req, res) => {
  const { id } = req.params;
  const connection = await conn.getConnection();
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const priceWeight = parseFloat(req.query.price_weight) || 0.2;
    const yearWeight = parseFloat(req.query.year_weight) || 0.2;
    const milageWeight = parseFloat(req.query.milage_weight) || 0.2;
    const categoryWeight = parseFloat(req.query.category_weight) || 0.15;
    const makeWeight = parseFloat(req.query.make_weight) || 0.15;
    const fuelWeight = parseFloat(req.query.fuel_weight) || 0.1;
    const [rows] = await connection.query(
      "CALL proc_similar_cars(?,?,?,?,?,?,?,?)",
      [
        id,
        limit,
        priceWeight,
        yearWeight,
        milageWeight,
        categoryWeight,
        makeWeight,
        fuelWeight,
      ]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};
module.exports = { addCar, getCars, getCarById, getSimilarCars };
