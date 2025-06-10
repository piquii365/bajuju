const { Router } = require("express");
const handleMake = require("../controllers/make.controller.cjs");
const router = Router();
router.route("/").get(handleMake.getMake).post(handleMake.addMake);
router.route("/:id").put(handleMake.updateMake).delete(handleMake.deleteMake);
module.exports = router;
