const { Router } = require("express");
const handleTransmission = require("../controllers/transmission.controller.cjs");
const router = Router();
router.route("/").get(handleTransmission.getTransmission);
module.exports = router;
