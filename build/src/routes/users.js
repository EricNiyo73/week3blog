"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _User = _interopRequireDefault(require("../models/User.js"));
var _Post = _interopRequireDefault(require("../models/Post.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
const _excluded = ["password"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const router = (0, _express.Router)();
// sign up

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await _bcrypt.default.genSalt(10);
      req.body.password = await _bcrypt.default.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await _User.default.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      });
      return res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await _User.default.findById(req.params.id);
      await _User.default.findByIdAndDelete(req.params.id);
      return res.status(200).json("User has been deleted...");
      // try {
      //   await Post.deleteMany({ username: user.username });
      //   await User.findByIdAndDelete(req.params.id);
      //   return res.status(200).json("User has been deleted...");
      // } catch (err) {
      //   return res.status(500).json(err);
      // }
    } catch (err) {
      return res.status(404).json("User not found!");
    }
  } else {
    return res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await _User.default.findById(req.params.id);
    const _user$_doc = user._doc,
      {
        password
      } = _user$_doc,
      others = _objectWithoutProperties(_user$_doc, _excluded);
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=users.js.map