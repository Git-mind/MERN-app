import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    id: { type: String },
});

// export it as mongoose model so that you can run find, create, delete and update.

export default mongoose.model("User", userSchema);