

const app = require("./app")
const dotenv = require("dotenv")
const dbConnection = require("./config/dbConnection")

dotenv.config({ path: "./config/config.env" })

dbConnection();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})