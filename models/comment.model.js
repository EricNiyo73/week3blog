import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  blogId: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', commentSchema);
