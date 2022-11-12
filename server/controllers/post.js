import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

// Clean code - Controller is where you put in your router logic.
//export getPosts as a function. Import it in router file
export const getPosts = async (req, res) =>{
    try{
        //finding something in a model take time. 
        //This means that it is a async action. 
        //Add await and make it async function
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        // an array of all messages
        res.status(200).json(postMessages)
    } catch (error){
        res.status(404).json({message: error.message})
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updatePost = async (req, res) => {
    // each post has it own id
    //object destructuring need to rename it as _id
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    //mongoose syntax
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async(req, res) => {
    const {id} = req.params;

    //req.userId from token
    // call middleware - auth before a specific action (likePost)
    if(!req.userId) return res.json({message: "Unauthenticated" });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    
    const post = await PostMessage.findById(id);

    // each likes will store the user id 
    // check if user has liked the post before
    // if user liked the post before, it will shows dislike button and not a like button
    const index = post.likes.findIndex((id) => id === String(req.userId));

    // if user has not like the post before
    if(index === -1){
        // like the post
        post.likes.push(req.userId);
    } else{
        // dislike a post
        post.likes = post.likes.filter((id)=> id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});


    res.json(updatedPost);
}

export default router;