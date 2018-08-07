const router = require("express").Router();
const User = require("../models/User");

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
router.post("/", (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  //  console.log('[users]', req.body);

  User.create(user)
    .then(createdUser => res.status(201).json(createdUser))
    .catch(err =>
      res.status(409).json({
        Error: err
      })
    );
});

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

module.exports = router;
