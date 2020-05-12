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


// routes middlewares
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", braintreeRoutes)
app.use("/api", orderRoutes)

const port = process.env.PORT || 8000;
// Serve any static files
app.use(express.static(path.join(__dirname, 'frontend/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
  }

app.listen(port, ( ) => {
    console.log(`Server is running on port ${port}`);
})