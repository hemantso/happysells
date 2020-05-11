const express = require("express");
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const expressJwt = require('express-jwt');
const path = require('path') 
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const braintreeRoutes = require("./routes/braintree")
const orderRoutes = require("./routes/order")

mongoose.connect(
    process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
  )
  .then(() => console.log('DB Connected'))

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, './frontend/build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build'))
});

// routes middlewares
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", braintreeRoutes)
app.use("/api", orderRoutes)



app.listen(port, ( ) => {
    console.log(`Server is running on port ${port}`);
})