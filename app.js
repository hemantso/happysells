const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require("express-validator");
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

 

//db
mongoose.connect(
  process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('database connected'))


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(expressValidator())
app.use(cors());

// app
app.use("/", authRoutes)
app.use("/", userRoutes)
app.use("/", categoryRoutes)
app.use("/", productRoutes)


const port = process.env.PORT  || 8000;

app.listen(port, ()=> {
  console.log(`port is running on ${port}`)
})