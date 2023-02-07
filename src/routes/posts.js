// import router from "express".Router();
import  Router  from 'express';
const router = Router();
import bodyParser from 'body-parser';
import Post from "../models/Post.js";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import express from "express";
import authorizeUser from "../middlewires/middleware.js"
import authentication from "../middlewires/mustHveAccount.js";
const app = express();
router.use("/images", express.static(path.join(process.cwd(), "/images")));
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());
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
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name:"dmdogre0f",
  api_key:"295662518861996",
  api_secret:"H35LhOiKccJExJLZJIJoI_o-25E"
});
var upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
      if (ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
router.post("/create",upload.single("photo"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(req.body,req.file);
        const newPost = new Post({
            photo: result.secure_url,
            title: req.body.title,
            desc:req.body.desc,
            username: req.body.username,
            categories: req.body.categories
          })
  
          const savePost = await  newPost.save();
  
         return res.status(200).json({
            savePost,
          status: "your post was successfully uploaded"})   ;
  
      } catch (error) {
        return  res.status(500).json(error)
          
      }
  })

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
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
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
router.delete("/:id",async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("Post has been deleted...");
      } catch (err) {
        return  res.status(500).json(err);
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
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/",async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
