const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const bodyParser = require("body-parser");
const todoRouter = require("./controllers/todoRouter");
const loginRouter = require("./utils/auth/login")
require("./db/connection");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.json());
app.use("/todoList", todoRouter);
app.use("/login", loginRouter);

module.exports = app;
