const express = require("express")
const router = express.Router()

const ratingController = require("../controller/rating.controller")
const authenticate = require("../middleware/authenticate")

router.post("/create", authenticate, ratingController.createRating);
router.put('/product/:produtcId', authenticate, ratingController.getAllRating)

module.exports = router;