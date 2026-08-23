const express = require("express");

const {
  sendRequest,
  getRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, sendRequest);

router.get("/", protect, getRequests);

router.put("/:id", protect, updateRequestStatus);

module.exports = router;