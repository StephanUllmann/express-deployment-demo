import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  content: String,
});

const Post = model('post', PostSchema);

export default Post;
