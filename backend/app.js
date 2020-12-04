const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./model/post");
const multer = require("multer");
const path = require('path')

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join('backend/images')))


const MIME_TYPE = {
  'image/png':'png',
  'image/jpg':'jpg',
  'image/jpeg':'jpeg',

}

const storage = multer.diskStorage({
  destination : (req, file, cb)=> {
    const isValid = MIME_TYPE[file.mimetype]
    const error = new Error('Invalid file type')
    if(isValid){
      errors = null
    }
    cb(errors, "backend/images/");
  },

  filename: (req, file, cb)=> {
    const ext = MIME_TYPE[file.mimetype]
    let filename = file.originalname.toLowerCase().split(' ').join('-') + '.' + ext
    console.log(filename);
    cb(null, Date.now() +  filename);
  },
});

app.post("/posts", multer({ storage: storage }).single('image'), async (req, res, next) => {
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
});

app.get("/posts", async (req, res, next) => {
  try {
    const post = await Post.find();
    res.status(200).send(post);
  } catch (error) {}
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).send(post);
  } catch (e) {
    console.log(e);
  }
});

app.patch("/posts/:id", multer({ storage: storage }).single('image'), async (req, res) => {
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
});

app.delete("/posts/:id", async (req, res, next) => {
  const dataId = req.params.id;
  console.log(dataId);
  try {
    const post = await Post.findByIdAndDelete(dataId);
    res.send();
  } catch (e) {
    console.log(e);
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/post-app", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect to the mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log("conncet usring port ", port);
});
