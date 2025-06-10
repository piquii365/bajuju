const { Router } = require("express");
const handleFuel = require("../controllers/fuel.controller.cjs");
const router = Router();
router.route("/").get(handleFuel.getFuel);
module.exports = router;
