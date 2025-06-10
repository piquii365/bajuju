const { Router } = require("express");
const handleAccessories = require("../controllers/accessories.controller.cjs");
const router = Router();
router
  .route("/")
  .get(handleAccessories.getAccessories)
  .post(handleAccessories.addAccessory);
router
  .route("/:id")
  .put(handleAccessories.updateAccessory)
  .delete(handleAccessories.deleteAccessory);
module.exports = router;
