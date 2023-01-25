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