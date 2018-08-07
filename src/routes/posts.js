const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
  Post.findAll({}).then(posts => {
    res.json(posts);
  });
});
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      PostId: req.params.id
    }
  }).then(post => {
    console.log(post);
    res.json(post);
  });
});

router.post("/", (req, res) => {
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    UserId: req.body.UserId
  };

  Post.create(newPost)
    .then(post => res.json(post))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

router.put("/:id", (req, res) => {
  const { title, description, imageUrl, UserId } = req.body;

  const updatedPost = {};

  if (title) {
    updatedPost.title = title;
  }
  if (description) {
    updatedPost.description = description;
  }
  if (imageUrl) {
    updatedPost.imageUrl = imageUrl;
  }
  if (UserId) {
    updatedPost.UserId = UserId;
  }

  Post.update(updatedPost, {
    where: {
      PostId: req.params.id
    }
  })
    .then(post => res.json(post))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      PostId: req.params.id
    }
  })
    .then(posts => res.json(posts))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

module.exports = router;
