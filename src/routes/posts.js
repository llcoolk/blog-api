const router = require("express").Router();
const Post = require("../models/Post");
const isAuth = require("../middlewares/isAuth");
const postCtrl = require("../controllers/posts");

router.get("/", (req, res) => {
  Post.findAll({}).then(posts => {
    res.json(posts);
  });
});
router.get("/:id", postCtrl.getOne);

router.post("/", isAuth, postCtrl.create);

router.put("/:id", postCtrl.update);
router.delete("/:id", isAuth, postCtrl.remove);

module.exports = router;
