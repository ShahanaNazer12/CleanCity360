const express = require("express");
const { viewRequest, requestPickup, trackRequests, updateRequest, deleteRequest } = require("../controllers/garbageController");
const { authorize, userAuth } = require("../middlewares/userAuth");
const router = express.Router();
router.route("/view-requests").get(viewRequest)
router.route("/create-request").post(userAuth,authorize(["user"]),requestPickup);
router.route("/track-requests").get(userAuth,authorize(["user"]),trackRequests);
router.route("/update-request/:id").put(userAuth,authorize(["user"]),updateRequest)
router.route("/delete-request/:id").delete(userAuth,authorize(["user"]),deleteRequest)
module.exports = router