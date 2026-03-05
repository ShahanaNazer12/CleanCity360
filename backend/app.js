const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("CleanCity360 API is running ");
});


app.use(cors({credentials:true,origin:true}));
app.use(express.json());




app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


const authRoutes = require("./routes/authRoutes")
const areaRoutes = require("./routes/areaRoutes")

const garbageRoute = require("./routes/garbageRoutes")
const userRoutes = require("./routes/userRoutes")


app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/area",areaRoutes)


app.use("/api/v1/user",userRoutes)
app.use("/api/v1/garbage",garbageRoute)

module.exports = app