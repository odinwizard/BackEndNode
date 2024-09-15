const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// buisness logic......

exports.createComment = async (req, res) => {
    try {
        //fetch data from req body...
        const {post, user, body} = req.body;
        //create a comment object...
        const comment = new Comment({
            post,user,body 
        });
        //save the new comment into the database...
        const savedComment = await comment.save();
        //find the post by ID 
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})
                            .populates("comments") //populates the commnts array with comment document.

        res.json({
            post: updatedPost,
        })                    
    } catch (error) {
        return res.status(500).json({
            error: "Error while creating comment",
        });
    }
};