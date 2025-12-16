const express = require("express");
const router = express.Router();
const webhooksController = require("../controllers/webhooks.controller");

// Lenco webhook endpoint
router.post(
  "/lenco",
  webhooksController.handleLencoWebhook.bind(webhooksController)
);

module.exports = router;
