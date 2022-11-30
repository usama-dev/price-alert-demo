const router = require("express").Router();
const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.get)
  .post(productController.post)
  .put(productController.put)
  .delete(productController.delete);

module.exports = router;
