const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
require('dotenv').config()

const dbconnection = require("./config/database")
const cloudinaryConnect = require("./config/cloudinary")
const courseRoutes = require('./routes/course')
const paymentRoutes = require('./routes/payment')
const profileRoutes = require('./routes/profile')
const userRoutes = require('./routes/user')
const contactRoutes = require('./routes/contact')

const PORT = process.env.PORT || 4001
const FRONTEND_URL = process.env.FRONTEND_URL

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

// Cloudinary connection
cloudinaryConnect()

// Routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/reach", contactRoutes)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the API"
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

dbconnection()
