const { Router } = require("express");
const handleCategories = require("../controllers/category.controller.cjs");
const router = Router();
router
  .route("/")
  .get(handleCategories.getCategories)
  .post(handleCategories.addCategory);
router
  .route("/:id")
  .put(handleCategories.updateCategory)
  .delete(handleCategories.deleteCategory);
module.exports = router;
