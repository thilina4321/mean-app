const express = require('express')
const router = express.Router()

// controller exports
const controller = require('../controller/controller')

// export multer package
const multer = require('../multer/multer')

router.post("/posts", multer.multer, controller.createPost);
router.get("/posts", controller.allPost);
router.get("/posts/:id", controller.findPostToUpdate);
router.patch("/posts/:id", multer.multer, controller.updatePost);
router.delete("/posts/:id", controller.deletePost);


module.exports = router
