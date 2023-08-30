const express = require("express");
const { sendData, getData } = require("../controllers/smartWatchControllers");
const router = express.Router();
router.route("/sendData").post(sendData);
router.route("/getData").get(getData);

module.exports = router;
