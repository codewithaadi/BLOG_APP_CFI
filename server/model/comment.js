import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        require: true
    },
    comments:{
        type: String,
        required: true
    }
})

const comment = mongoose.model('blog_comment',commentSchema);

export default comment;