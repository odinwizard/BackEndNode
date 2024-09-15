const Post = require("../models/postModel");
const Like = require("../models/likeModel");


exports.likepost = async (req, res) => {
    try {
        const {post, user} = req.body
        const like = new Like( {
            post, user
        });
        const savedLike = await like.save();

        //update the post collection basis on this..
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes:savedLike._id}}, {new : true})
        .populate("likes").exec();
        res.json({
            post: updatedPost
        })
    } catch (error) {
        return res.status(500).json({
            error: "Error while creating comment",
        });
    }
}

//unlike post...........
exports.unlikePost = async (req, res) => {
    try {
        const{post, like} = req.body;
        //find and delete the like from collection....
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});
        //update the post....
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true});

        res.json({
            post:updatedPost,
        })


    } catch (error) {
        return res.status(500).json({
            error: "Error while unliking post",
        });
    }
}



