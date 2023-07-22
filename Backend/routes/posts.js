const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { route } = require("./auth");

//CREATE POST
router.post("/", async (req, res) =>{
    const newPost = new Post(req.body);
    try{
        const savedPost = newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(err);
    }
});


//UPDATE POST
router.put("/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true})
                //new -> updates the user and sends the updated user
                res.status(200).json(updatedPost);
            } catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can update only your posts");
        }
    } catch(err){
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id)
        if(post){
            if(post.username === req.body.username){
                try{    
                    // await Post.deleteMany({username : user.username});
                    await Post.findByIdAndDelete(req.params.id);
                    res.status(200).json("Post has been deleted");
                } catch(err){
                    res.status(500).json(err);
                }
            }
            else{
                res.status(401).json("You can delete only your posts!");
            }
        }
        else{
            res.status(404).json("Post Not found");
        }
    } catch(err){
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        // if(user){
            //to display the details except password
            // const {password, ...others} = user._doc;
            res.status(200).json(post);
        // }
    } catch(err){
        res.status(500).json(err)
    }
});

//GET ALL POSTS
router.get("/", async (req, res) =>{
    const username = req.query.user;
    const catname = req.query.cat;
    try{
        let posts;
        if(username){
            // filter by user
            posts = await Post.find({username})
        }
        else if(catname){
            // filter by category
            posts = await Post.find({categories:{
                $in:[catname]
                //if categories array contains the catname
            }});
        }
        else{
            // select all posts
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;