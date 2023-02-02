"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _auth = _interopRequireDefault(require("./routes/auth.js"));
var _users = _interopRequireDefault(require("./routes/users.js"));
var _posts = _interopRequireDefault(require("./routes/posts.js"));
var _categories = _interopRequireDefault(require("./routes/categories.js"));
var _commentCo = _interopRequireDefault(require("./routes/commentCo.js"));
var _multer = _interopRequireDefault(require("multer"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _path = _interopRequireDefault(require("path"));
var _databaseConfig = _interopRequireDefault(require("./config/database.config.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
// import app from express();

_dotenv.default.config();
app.use(_express.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));
_cloudinary.default.config({
  cloud_name: "dmdogre0f",
  api_key: "295662518861996",
  api_secret: "H35LhOiKccJExJLZJIJoI_o-25E"
});
_mongoose.default.Promise = global.Promise;
_mongoose.default.connect(_databaseConfig.default.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('something went wrong', err);
  process.exit();
});
const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "eric.jpg");
  }
});
const upload = (0, _multer.default)({
  storage: storage
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
app.get('/', (req, res) => {
  return res.json({
    message: "Welcome  I am testing"
  });
});
app.use("/images", _express.default.static(_path.default.join(process.cwd(), "/images")));
app.use("/api/comment", _commentCo.default);
app.use("/api/auth", _auth.default);
app.use("/api/users", _users.default);
app.use("/api/posts", _posts.default);
app.use("/api/categories", _categories.default);
app.listen("5000", () => {
  console.log("Server is listening on port 5000");
});