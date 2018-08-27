const getOne = (req, res) => {
  Post.findOne({
    where: {
      PostId: req.params.id
    }
  }).then(post => {
    console.log(post);
    res.json(post);
  });
};

const create = (req, res, next) => {
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    UserId: req.body.UserId
  };

  Post.create(newPost)
    .then(post => res.status(201).json(post))
    .catch(err =>
      res.status(422).json({
        Error: err
      })
    );
};

const update = (req, res) => {
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
    .then(post => res.json({ updated: true }))
    .catch(err =>
      res.json({
        updated: false,
        message: err
      })
    );
};

const remove = (req, res, next) => {
  console.log("userData:", req.userData);
  Post.findOne({ where: { postId: req.params.id } }).then(post => {
    if (post !== null) {
      Post.destroy({
        where: {
          PostId: req.params.id
        }
      })
        .then(posts =>
          res.json({ success: true, message: "Post has been deleted." })
        )
        .catch(err =>
          res.json({
            Error: err
          })
        );
    } else {
      res.json({
        success: false,
        message: "There's no posts with the provided ID."
      });
    }
  });
};

module.exports = { create, getOne, update, remove };
