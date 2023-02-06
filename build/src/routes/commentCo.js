"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _commentModel = _interopRequireDefault(require("../models/comment.model.js"));
var _Post = _interopRequireDefault(require("../models/Post.js"));
var _middleware = _interopRequireDefault(require("../middlewires/middleware.js"));
var _mustHveAccount = _interopRequireDefault(require("../middlewires/mustHveAccount.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.default)();
router.post('/blogs/:blogId/comments', _mustHveAccount.default, async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await _Post.default.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found'
      });
    }
    const comment = {
      text: req.body.text,
      author: req.body.author
    };
    blog.comments.push(comment);
    const savedBlog = await blog.save();
    return res.status(201).json(savedBlog);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
  // const blogId = req.params.blogId;
  // try {
  //   const blog = await Blog.findById(blogId);
  //   if (!blog) {
  //     return res.status(400).send({ error: 'Invalid blogId' });
  //   }
  //   const comment = new Comment({
  //     blogId: blogId,
  //     author: req.body.author,
  //     content: req.body.content,
  //   });
  //   await comment.save();
  //   res.status(201).send({ message: 'Comment added successfully' });
  // } catch (error) {
  //   res.status(400).send({ message: "this Blog is no longer exists" });
  // }
});

//   getall comments=======================

router.get('/blogs/:blogId/comments', _mustHveAccount.default, async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const comments = await _commentModel.default.find({
      blogId: blogId
    });
    return res.send(comments);
  } catch (error) {
    return res.status(400).send({
      error: error.message
    });
  }
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=commentCo.js.map