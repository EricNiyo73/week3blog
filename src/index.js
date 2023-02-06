import express from "express";
const app = express();
// import app from express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import commentRoute from "./routes/commentCo.js";
import bodyParser from 'body-parser';
import path from "path";
import authorization from "./middlewires/middleware.js";
// import dbConfig from './config/database.config.js';
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify:true
//   })
const connectionString ="mongodb+srv://Ericn:12345@cluster0.b3fjnbe.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString, { useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify:true,
  useUnifiedTopology: true
 })
  .then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('something went wrong', err);
    process.exit();
});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, "eric.jpg");
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });
app.get('/', (req, res) => {
   return res.json({message: "Welcome  I am testing"});
});
// app.use("/images", express.static(path.join(process.cwd(), "/images")));
app.use("/api/comment", commentRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Server is listening on port 5000");
});
