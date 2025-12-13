const express = require("express");
const router = express.Router();
const donationsController = require("../controllers/donations.controller");

router.post("/initiate", donationsController.initiate);
router.get("/status/:reference", donationsController.checkStatus);
router.get("/list", donationsController.list);

module.exports = router;
