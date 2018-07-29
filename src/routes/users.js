const router = require('express').Router();
const User = require('../models/User');


router.get('/', (req, res) => {
  User.findAll({}).then(users => {
    console.log(users);
    res.json(users);
  });
});

router.put('/:id', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  const user = {};

  if (firsName) {
    post.firstName = firstName;
  }
  if (lastName) {
    post.lastName = lastName;
  }
  if (username) {
    post.username = username;
  }
  if (password) {
    post.password = password;
  }

  Post.update(user, {
      where: {
        id: req.params.id,
      },
    })
    .then(user => res.json(user))
    .catch(err =>
      res.json({
        Error: err,
      })
    );
});
router.post('/', (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  console.log('[users]', req.body);

  User.create(user).then(user => res.json(user)).catch(err =>
    res.json({
      Error: err,
    })
  );
});

router.put('/:id', (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  User.update(user, {
      where: {
        id: req.params.id,
      },
    })
    .then(user => res.json(user))
    .catch(err =>
      res.json({
        Error: err,
      })
    );
});

router.delete('/:id', (req, res) => {
  User.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(users => res.json(users))
    .catch(err =>
      res.json({
        Error: err,
      })
    );
});

module.exports = router;