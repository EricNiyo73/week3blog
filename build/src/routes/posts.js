"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _Post = _interopRequireDefault(require("../models/Post.js"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _middleware = _interopRequireDefault(require("../middlewires/middleware.js"));
var _mustHveAccount = _interopRequireDefault(require("../middlewires/mustHveAccount.js"));
var _cloudinary = require("cloudinary");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import router from "express".Router();

const router = (0, _express.default)();
const app = (0, _express.default)();
router.use("/images", _express.default.static(_path.default.join(process.cwd(), "/images")));
router.use(_bodyParser.default.urlencoded({
  extended: true
}));
router.use(_bodyParser.default.json());
//CREATE POST
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, "eric.jpg");
//   },
// });
// const upload = multer({ storage: storage });

// =============================

_cloudinary.v2.config({
  cloud_name: "dmdogre0f",
  api_key: "295662518861996",
  api_secret: "H35LhOiKccJExJLZJIJoI_o-25E"
});
var upload = (0, _multer.default)({
  storage: _multer.default.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = _path.default.extname(file.originalname);
    if (ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  }
});
router.post("/create", _mustHveAccount.default, upload.single("photo"), async (req, res) => {
  try {
    const result = await _cloudinary.v2.uploader.upload(req.file.path);
    // console.log(req.body,req.file);
    const newPost = new _Post.default({
      photo: result.secure_url,
      title: req.body.title,
      desc: req.body.desc,
      username: req.body.username,
      categories: req.body.categories
    });
    const savePost = await newPost.save();
    return res.status(200).json({
      savePost,
      status: "your post was successfully uploaded"
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

//   const newPost = new Post({
//     title: req.body.title,
//     desc: req.body.desc, 
//     //  photo: req.body.photo,
//     username: req.body.username,
//     categories: req.body.categories
//   })
//   try {
//     const savedPost = await newPost.save();
//   //  const uploaded = await upload.save();
//     res.status(200).json({
//       savedPost,
//     message:"file uploaded"});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//UPDATE POST
router.put("/:id", _mustHveAccount.default, async (req, res) => {
  try {
    const post = await _Post.default.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await _Post.default.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, {
          new: true
        });
        return res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", _mustHveAccount.default, async (req, res) => {
  try {
    const post = await _Post.default.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("Post has been deleted...");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await _Post.default.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await _Post.default.find({
        username
      });
    } else if (catName) {
      posts = await _Post.default.find({
        categories: {
          $in: [catName]
        }
      });
    } else {
      posts = await _Post.default.find();
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=posts.js.map