const { Router } = require("express");
const handleCountries = require("../controllers/countries.controller.cjs");
const router = Router();
router
  .route("/")
  .get(handleCountries.getCountries)
  .post(handleCountries.addCountry);
router
  .route("/:id")
  .put(handleCountries.updateCountry)
  .delete(handleCountries.deleteCountry);
module.exports = router;
