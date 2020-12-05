// Post database module
const Post = require("../model/post");


exports.createPost = async (req, res, next) => {
  const data = req.body;
  try {
    const url = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
    const post = await new Post({...data, imageUrl:url});
    const savedPost = await post.save();
    console.log(savedPost);
    res.status(201).send(savedPost);
  } catch (e) {
    console.log(e);
  }
}

exports.allPost = async (req, res, next) => {
  try {
    const post = await Post.find();
    res.status(200).send(post);
  } catch (error) {}
}

exports.findPostToUpdate = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).send(post);
  } catch (e) {
    console.log(e);
  }
}

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let imageUrl = data['imageUrl']
  console.log(req.file);
  if(req.file){
    console.log('owne');
    imageUrl = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
  }
  console.log(imageUrl);

  try {
    await Post.findByIdAndUpdate(id, {_id:id,...data, imageUrl:imageUrl}, { new: true, runValidators: true });
    res.send();
  } catch (e) {
    console.log(e);
  }
}


exports.deletePost = async (req, res, next) => {
  const dataId = req.params.id;
  console.log(dataId);
  try {
    const post = await Post.findByIdAndDelete(dataId);
    res.send();
  } catch (e) {
    console.log(e);
  }
}
