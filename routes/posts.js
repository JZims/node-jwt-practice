const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Routes

//Retrieves all posts
router.get('/', async (req, res) => {
    try {
       const posts = await Post.find() 
       res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
});

//Submits a post
router.post('/', async (req, res) => {
    // console.log(req.body);
    // res.send('Request received.')
    const post = new Post({
        title: req.body.title, 
        description: req.body.description
    })
   //adds response to db, save returns a promise that needs to be unpacked 
   //and sent back to frontend
   //-------------------
   //With async/await
    try {
   const savedPost = await post.save()
    res.json(savedPost)
    } catch(err) {
        res.json({ message: err })
    }

// Without async/await
//    const savedPost = .save()
//         .then(data => {
//             res.json(data)
//         })
//         .catch(err => {
//             res.json({ message: err })
//         })

})

//Get a specific post
router.get('/:postId', async (req, res) => {
    try {
    const post = await Post.findById(req.params.postId)
    res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
});

//Delete a post

router.delete('/:postId', async (req, res) => {
    try { 
        const removedPost = await Post.deleteOne({ _id: req.params.postId })
        res.json(removedPost)
    } catch(err) {
        res.json({ message: err });
    }
});

//Update a Post

router.patch('/:postId', async (req, res) => {
    try { 
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost) 
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;