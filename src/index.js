const express = require("express");
const cors = require("cors");
const sequelize = require("./models");
const appRoutes = express.Router();
const app = express();
const Posts = require("./routes/posts");
const Users = require("./routes/users");

app.use(express.json());
app.use(cors());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/posts", Posts);
app.use("/users", Users);

app.listen(8081, () => console.log("Server running at http://localhost:8081"));
