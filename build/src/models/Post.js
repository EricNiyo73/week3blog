"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PostSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: false
  },
  comments: {
    type: Array
  }
});
var _default = _mongoose.default.model("Post", PostSchema);
exports.default = _default;
//# sourceMappingURL=Post.js.map