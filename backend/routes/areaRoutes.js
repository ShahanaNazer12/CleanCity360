const express = require("express");
const { addArea, editArea, deleteArea, getArea } = require("../controllers/areaController");
const { userAuth, authorize } = require("../middlewares/userAuth");
const router = express.Router();
router.route("/add-area").post(userAuth,authorize(["admin"]),addArea);
router.route("/edit-area/:id").put(userAuth,authorize(["admin"]),editArea);
router.route("/delete-area/:id").delete(userAuth,authorize(["admin"]),deleteArea);
router.route("/get-all-area").get(getArea)



module.exports = router