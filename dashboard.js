const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const crudRoutes = require("./crud");

router.use(authMiddleware); 
router.use("/crud", crudRoutes); 

module.exports = router;