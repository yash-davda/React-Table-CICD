import Comment from "../models/comment.js";
export const getComment = async(req,res) =>{
    try{
        const {
            page = 1,
            search = "",
            limit = 10,
            sortField = 'id',
            sortOrder = 'ase',
        } = req.query;
        const query = {
            $or : [
                {name:{$regex:search, $options:'i'}},
                {email:{$regex:search, $options:'i'}}
            ]
        };
        const total = await Comment.countDocuments(query);
        const comments = await Comment.find(query)
        .sort({[sortField]: sortOrder === 'ase' ? 1 : -1})
        .skip((page - 1) * limit)
        .limit(Number(limit));

        res.json({
            data: comments,
            total,
            page:Number(page),
            totalPages: Math.ceil(total/limit)
        })
    }
    catch(error){
            res.status(500).json({ message: error.message });

    }
}