"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _Category = _interopRequireDefault(require("../models/Category.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import  router = require("express").Router();

const router = (0, _express.Router)();
router.post("/", async (req, res) => {
  const newCat = new _Category.default(req.body);
  try {
    const savedCat = await newCat.save();
    return res.status(200).json(savedCat);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const cats = await _Category.default.find();
    return res.status(200).json(cats);
  } catch (err) {
    return res.status(500).json(err);
  }
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=categories.js.map