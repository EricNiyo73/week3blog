"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Authorization;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _Post = _interopRequireDefault(require("../models/Post.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function Authorization(req, res, next) {
  try {
    const blog = req.blog;
    const post = await _Post.default.findOne({
      username
    });
    const token = req.headers.authorization;
    if (token) {
      var decodedToken = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      ;
      const user = await _User.default.findById(decodedToken._id);
      const post = await _Post.default.findOne({
        username
      });
      if (post.username !== user.username) {
        return res.status(403).json({
          message: 'Forbidden'
        });
      } else {
        next();
      }
    } else {
      return res.status(403).json({
        message: 'you are not authorised'
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}
;
//# sourceMappingURL=middleware.js.map