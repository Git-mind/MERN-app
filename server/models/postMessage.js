import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

// export it as mongoose model so that you can run find, create, delete and update.
const PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage;