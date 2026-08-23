const SwapRequest = require("../models/SwapRequest");
const User = require("../models/User");

const sendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;

    const senderId = req.userId;

    if (!receiverId) {
      return res.status(400).json({
        message: "Receiver ID is required",
      });
    }

    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot send a request to yourself",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingRequest = await SwapRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Swap request already sent",
      });
    }

    const request = await SwapRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json({
      message: "Swap request sent successfully",
      request,
    });
  } catch (error) {
    console.error("Send request error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


const getRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      $or: [
        { sender: req.userId },
        { receiver: req.userId },
      ],
    })
      .populate("sender", "name email bio skillsHave skillsWant")
      .populate("receiver", "name email bio skillsHave skillsWant")
      .sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get requests error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Swap request not found",
      });
    }

    if (request.receiver.toString() !== req.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "This request has already been processed",
      });
    }

    request.status = status;

    await request.save();

    res.status(200).json({
      message: `Request ${status} successfully`,
      request,
    });
  } catch (error) {
    console.error("Update request error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  sendRequest,
  getRequests,
   updateRequestStatus,
};