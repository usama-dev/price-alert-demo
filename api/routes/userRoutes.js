const router = require("express").Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.get)
  .post(userController.post)
  .put(userController.put)
  .delete(userController.delete);

module.exports = router;
