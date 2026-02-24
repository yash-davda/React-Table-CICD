import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  postId: Number,
  name: String,
  email: String,
  body: String
},{timestamps:true});
export default mongoose.model('Comment',commentSchema);
