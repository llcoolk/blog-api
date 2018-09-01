const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  User.findAll({}).then(users => {
    res.json(users);
  });
});

router.put("/:id", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = {};

  if (firsName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = password;
  }

  User.update(user, {
    where: {
      id: req.params.id
    }
  })
    .then(updatedUser => res.json(updatedUser))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        Error: err
      });
    } else {
      console.log("hashedPass:", hash);
      const newUser = {
        email: req.body.email,
        password: hash
      };

      User.create(newUser)
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "User created."
          });
        })
        .catch(err => {
          //console.log(err);
          res.status(200).json({
            message: err.errors[0].message
          });
        });
    }
  });
});

// router.post("/", (req, res) => {
//   const user = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password
//   };

//   //  console.log('[users]', req.body);

//   User.create(user)
//     .then(createdUser => res.status(201).json(createdUser))
//     .catch(err =>
//       res.status(409).json({
//         Error: err
//       })
//     );
// });

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(users => res.json(users))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then(user => {
    if (user !== null) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            "shhhhhh"
          );
          res.json({ token });
        } else {
          res.json({ success: false, message: "Password is incorrect!" });
        }
      });
    }
  });
});

module.exports = router;
