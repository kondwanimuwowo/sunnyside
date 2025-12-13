const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");

router.post("/submit", enrollmentController.submit);
router.get("/status/:referenceNumber", enrollmentController.getStatus);

module.exports = router;
