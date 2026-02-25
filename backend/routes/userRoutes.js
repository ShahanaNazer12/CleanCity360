const express = require("express");
const {  addWorker, assignAreaToWorker, editWorker, deleteWorker, viewWorkerRequests, completeRequests, getWorker, updateStatus, getAllUsers,  } = require("../controllers/userController");
const { userAuth, authorize } = require("../middlewares/userAuth");


const router = express.Router();



//admin
router.route("/add-worker").post(userAuth,authorize(["admin"]),addWorker)
// router.route("/assign-area").post(userAuth,authorize(["admin"]),assignAreaToWorker)
router.route("/update-worker/:id").put(userAuth,authorize(["admin"]),editWorker)
router.route("/delete-worker/:id").delete(userAuth,authorize(["admin"]),deleteWorker)
router.route("/get-all-workers").get(getWorker)
router.route("/update-status/:id").put(updateStatus)
router.route("/get-all-users").get(getAllUsers)

//worker

router.route("/view-request-worker").get(userAuth,authorize(["worker"]),viewWorkerRequests)
router.route("/update-completed-request/:id").patch(userAuth,authorize(["worker"]),completeRequests)





module.exports = router