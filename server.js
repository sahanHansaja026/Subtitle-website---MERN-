const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

const UserRouter = require("./routes/user");
const SubtitleRouter = require("./routes/subtitle");

app.use(bodyParser.json());
app.use(cors());

app.use("./uploads", express.static(path.join(__dirname, "uploads")));

app.use(UserRouter);
app.use(SubtitleRouter);

const port = 9000;
const database = "mongodb://localhost:27017/subtitle";

mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });
