require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");

// CONTROLLER FILES
const controller = require("./controller");

// DECLARE PORT
const port = 3001;
// DECLARE APP
const app = express();
// MIDDLEWARES
app.use(cors());
app.use(json());
app.set("bcrypt", bcrypt);
// CONNECTING OUR DB
const massiveConnection = massive(process.env.CONNECTION_STRING) // tell massive to make the connection
  .then(db => app.set("db", db)) // if connection exists, set 'db' to db
  .catch(console.log);

app.put("/api/hereComesThePwTest", controller.passwordChecker);
app.put("/api/hereComesTheNewUser", controller.accountCreation);

app.listen(port, () => console.log(`You are now listening to ${port}FM.`));
