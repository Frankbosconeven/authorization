const Post = require('./post.model');
const verifyAuthor = async (req, user) => {
  let post = await Post.findById(req.params.postId);
  if (post.id.toString() == user.req.id){
    return res
    .status(406)
    .json({error: "You are not permitted to perform this post"})
  }
}
exports.getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

exports.getAllPostByUser = async (req, res) => {
  const post = await Post.find({author: req.user.id});
  res.status(200).json({ posts });
}
exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  const post = await Post.create({
    title,
    body,
    author: req.user.id,
  });

  res.status(201).json({ post });
};

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.status(200).json({ post });
};
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  
  await verifyAuthor(); 

 const post = await Post.findByIdAndUpdate(
    postId,
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ post });
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  await verifyAuthor();

  const post = await Post.findByIdAndDelete(postId);
  console.log(post);
  res.status(200).json({ msg: 'Post deleted Successfully' });
};
