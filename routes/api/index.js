const router = require("express").Router();
const bookRoutes = require("./books");
const cartRoutes = require("./cart");
const departmentRoutes = require("./departments");
const userRoutes = require("./user");

// routes
router.use("/books", bookRoutes);
router.use("/cart", cartRoutes);
router.use("/departments", departmentRoutes);
router.use("/", userRoutes);

module.exports = router;
