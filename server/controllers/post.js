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

export const createPost = async (req, res) =>{
    const body = req.body;

    const newPost = new PostMessage(post);
    try{
        await newPost.save();

        res.status(201).json(newPost);
    } catch {
        res.status(409).json({message: error.message})
    }
}