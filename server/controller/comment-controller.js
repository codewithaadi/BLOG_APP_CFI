import Comment from '../model/comment.js';

export const newComment = async (req,res)=>{
    try{
        const comment = await new Comment(req.body);
        comment.save();

        res.status(200).json({msg: 'Comment Save Successfully!!'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const getComments = async (req,res)=>{
    try{
        const comments = await Comment.find({postId: req.params.id})
        res.status(200).json(comments);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const deleteComment = async (req,res)=>{
    try{
        await  Comment.findByIdAndDelete(req.params.id); 
        return res.status(200).json({msg: 'Comment deleted successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}