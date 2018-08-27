const express = require("express");
const cors = require("cors");
const sequelize = require("./models");
const appRoutes = express.Router();
const app = express();
const Posts = require("./routes/posts");
const Users = require("./routes/users");
const userRoutes = require("./routes/users");
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

//sequelize.sync({ force: true });

// app.get("/api", verifyToken, (req, res) => {
//   res.json({
//     message: "Welcome to the API"
//   });
// });

// app.post("/api/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Post created...",
//         authData
//       });
//     }
//   });
// });

// app.post("/login", (req, res) => {
//   const user = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password
//   };
// });
// jwt.sign({ user }, "secretkey", (err, token) => {
//   res.json({
//     token
//   });
// });

// // Format of Token
// // Authoriazation: Bearer <access_token>

// // Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // split at the space
//     const bearer = bearerHeader.split(" ");
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }

app.use("/posts", Posts);
app.use("/users", Users);
// app.use("/user/signup", user);

app.listen(8081, () => console.log("Server started on http://localhost:8081"));
