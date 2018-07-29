const router = require('express').Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.findAll({}).then(posts => {
    console.log(posts);
    res.json(posts);
  });
});
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  }).then(post => {
    console.log(post);
    res.json(post);
  });
});

router.post('/', (req, res) => {
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    authorID: req.body.authorID,
  };

  Post.create(newPost).then(post => res.json(post)).catch(err =>
    res.json({
      Error: err,
    })
  );
});

router.put('/:id', (req, res) => {
  const {
    title,
    description,
    imageUrl,
    authorID
  } = req.body;

  const post = {};

  if (title) {
    post.title = title;
  }
  if (description) {
    post.description = description;
  }
  if (imageUrl) {
    post.imageUrl = imageUrl;
  }
  if (UserId) {
    post.UserId = UserId;
  }

  Post.update(post, {
      where: {
        id: req.params.id,
      },
    })
    .then(post => res.json(post))
    .catch(err =>
      res.json({
        Error: err,
      })
    );
});

router.delete('/:id', (req, res) => {
  Post.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(posts => res.json(posts))
    .catch(err =>
      res.json({
        Error: err,
      })
    );
});

module.exports = router;