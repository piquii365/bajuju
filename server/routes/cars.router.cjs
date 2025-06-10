const { Router } = require("express");
const handleCars = require("../controllers/cars.controller.cjs");
const uploadCars = require("../middleware/cars.middleware.cjs");
const router = Router();
router
  .route("/")
  .post(uploadCars.array("cars", 5), handleCars.addCar)
  .get(handleCars.getCars);
router.route("/:id").get(handleCars.getCarById);
router.route("/like/:id").get(handleCars.getSimilarCars);
module.exports = router;
