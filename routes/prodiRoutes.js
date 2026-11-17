const express = require("express");
const router = express.Router();
const c = require("../controllers/prodiController");
const verifyToken = require("../middlewares/verifyToken");
const hanyaRole = require("../middlewares/hanyaRole");

router.get("/", c.getAll);
router.post("/", verifyToken, hanyaRole("admin"), c.create);

module.exports = router;
