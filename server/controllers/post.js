import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

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

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

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
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    //mongoose syntax
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true});

    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    
    await PostMessage.findByIdAndRemove(id);

    res.json({message: "Post Delete Successully"});
}

export const likePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});


    res.json(updatedPost);
}