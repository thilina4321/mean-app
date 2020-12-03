const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./model/post");

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());




app.post("/posts", async (req, res, next) => {
  const data = req.body;
  try {
    const post = await new Post(data)
    const savedPost = await post.save()
    console.log(savedPost);
    res.status(201).send( savedPost );
  } catch (e) {
    console.log(e);
  }
});

app.get("/posts", async(req, res, next) => {
  try {
    const post = await Post.find()
    res.status(200).send(post);
  } catch (error) {

  }
});

app.get("/posts/:id", async(req,res)=>{
  const id = req.params.id
  try {
    const post = await Post.findById(id)
    res.status(200).send(post)
  } catch (e) {
    console.log(e);
  }
})


app.patch("/posts/:id", async(req,res)=>{
  const id = req.params.id
  const data = req.body

  try {
    await Post.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    res.send()
  } catch (e) {
    console.log(e);
  }
})



app.delete("/posts/:id", async(req,res,next)=>{
  const dataId = req.params.id
  console.log(dataId);
  try {
    const post = await Post.findByIdAndDelete(dataId)
    res.send()
  } catch (e) {
    console.log(e);
  }
})



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
