const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoute = require("./routes/users");

const app = express();

//connect to Database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to dataBase"))
  .catch((err) => console.log("dataBase connection error", err));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser);

//import routes
app.use("/api", userRoute);

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});
