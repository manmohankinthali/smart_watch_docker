const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errMiddleware = require("./middleware/error");
const userRoutes = require("./Routes/userRoute");
const dataRoutes = require("./Routes/dataRoutes");
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    withCredentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", userRoutes);
app.use("/api/v1", dataRoutes);
//adding middleware for errors
app.use(errMiddleware);
module.exports = app;
