"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _auth = _interopRequireDefault(require("./routes/auth.js"));
var _users = _interopRequireDefault(require("./routes/users.js"));
var _posts = _interopRequireDefault(require("./routes/posts.js"));
var _categories = _interopRequireDefault(require("./routes/categories.js"));
var _commentCo = _interopRequireDefault(require("./routes/commentCo.js"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _path = _interopRequireDefault(require("path"));
var _middleware = _interopRequireDefault(require("./middlewires/middleware.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
// import app from express();

// import dbConfig from './config/database.config.js';
_dotenv.default.config();
app.use(_express.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
_mongoose.default.Promise = global.Promise;

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify:true
//   })
const connectionString = "mongodb+srv://Ericn:12345@cluster0.b3fjnbe.mongodb.net/?retryWrites=true&w=majority";
_mongoose.default.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}).then(() => {
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
  return res.json({
    message: "Welcome  I am testing"
  });
});
// app.use("/images", express.static(path.join(process.cwd(), "/images")));
app.use("/api/comment", _commentCo.default);
app.use("/api/auth", _auth.default);
app.use("/api/users", _users.default);
app.use("/api/posts", _posts.default);
app.use("/api/categories", _categories.default);
app.listen("5000", () => {
  console.log("Server is listening on port 5000");
});
//# sourceMappingURL=index.js.map