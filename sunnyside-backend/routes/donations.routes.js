const express = require("express");
const router = express.Router();
const donationsController = require("../controllers/donations.controller");

router.post("/initiate", donationsController.initiate);
router.post("/:reference/otp", donationsController.submitOTP); // ⭐ OTP endpoint
router.get("/status/:reference", donationsController.checkStatus);
router.get("/list", donationsController.list);

module.exports = router;
