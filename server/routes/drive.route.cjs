const { Router } = require("express");
const handleDrive = require("../controllers/drive.controller.cjs");
const router = Router();
router.route("/").get(handleDrive.getDrive);
module.exports = router;
