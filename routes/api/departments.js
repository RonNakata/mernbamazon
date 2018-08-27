const router = require("express").Router();
const departmentsController = require("../../controllers/departmentsController");

// Matches with "/api/departments"
router.route("/")
  .get(departmentsController.findAll)
  .post(departmentsController.create);

// Matches with "/api/departments/:id"
router
  .route("/:id")
  .get(departmentsController.findById)
  .put(departmentsController.update)
  .delete(departmentsController.remove);

module.exports = router;
