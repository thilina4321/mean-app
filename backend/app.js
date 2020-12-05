// dependencies from packages
const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const cors = require("cors");

// exported files from router
const router = require('./router/router')

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join('backend/images')))

app.use(router)


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
