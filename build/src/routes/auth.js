"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const router = require("express").Router();

const router = (0, _express.default)();
//REGISTER

router.post("/register", async (req, res) => {
  const salt = await _bcrypt.default.genSalt(10);
  const hashedpassword = await _bcrypt.default.hash(req.body.password, salt);
  _User.default.find({
    email: req.body.email
  }).exec().then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    } else {
      // Create a user
      const newUser = new _User.default({
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword
      });
      newUser.save().then(result => {
        const token = _jsonwebtoken.default.sign({
          id: result._id
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.status(201).json({
          status: 'success',
          token,
          data: {
            user: result
          }
        });
      }).catch(error => {
        res.status(500).json({
          error
        });
      });
    }
  }).catch(error => {
    res.status(500).json({
      error
    });
  });
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await _User.default.findOne({
      username: req.body.username
    });
    !user && res.status(400).json("Wrong credentials!");
    const validated = await _bcrypt.default.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    // const { password, ...others } = user._doc;
    return res.status(200).json({
      message: "logged successfully"
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=auth.js.map