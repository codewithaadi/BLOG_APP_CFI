import Post from '../model/post.js';


export const createPost = async(req,res)=>{
    try{
        const post = await new Post(req.body);
        post.save();

        return res.status(200).json('Post Saved Successfully');
    }catch(error){
        return res.status(500).json(error);
    }
}