// const papermodel = require('../models/paper_model');
const postmodel = require('../models/post_model');
const UserController = require('./UserController');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const { any } = require('async');

// Display list of all posts.
exports.post_list = async(req, res) => {
    var post = null;
//   console.log("post id:"+req.query.id);
//   console.log("post where:"+req.query.where);
    try {
        if(req.query.where){
            // console.log("111:"+req.query.where.length);
            if(req.query.field){
                post = await postmodel.find({ research_field: { $regex: req.query.field}, _id:{$in: req.query.where}}).sort(req.query.sort).skip(req.query.skip).limit(parseInt(req.query.limit));
            }
            else{
                // console.log("2222",JSON.parse(req.query.where));
                post = await postmodel.find({ _id:{$in: req.query.where}}).sort(req.query.sort).skip(req.query.skip).limit(parseInt(req.query.limit));
            }
            // console.log("this post?"+post);
            if(post){
                res.status(200).json({message:"Success", data:post});
            }else{
                res.status(404).json({message:"No post matched", data:null});
            }
        }
        else if(req.query.field){
            // console.log(req.query);
            post = await postmodel.find({ research_field: { $regex: req.query.field}}).sort(req.query.sort).skip(req.query.skip).limit(parseInt(req.query.limit));
            if(post){
                res.status(200).json({message:"Success", data:post});
            }else{
                res.status(404).json({message:"No post matched", data:null});
            }
        }
        else{
            console.log("post here:"+post);
            res.status(200).json({message:"Success with no posts", data:post});
        }
    } catch(err) {
        // console.log(err)
        res.status(404).json({message:"Server error, fail to get posts' list", data:null});
    }
};

// Display detail page for a specific post.
exports.post_detail = async(req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message:"Not found: no matched post for id "+req.params.id, data:null});
        }
    
        const post = await postmodel.findById(req.params.id).lean();
        if(!post){
            return res.status(404).json({message:"Not found: no post data for id "+req.params.id, data:null});
        }else{
            return res.status(200).json({message:"Success", data:post});
        }
    }
    catch(error){
        res.status(500).json({message:"server error, fail to get a certain post info", data:error});
    }
};

// Handle post create on POST.
exports.post_create = async(req, res) => {
    const val_err = validationResult(req);
    if(!val_err.isEmpty()){
        return res.status(400).json({message:"new post validation failed", data:val_err.array()});
    }
    // console.log("hi!");
    try{
        let result = await postmodel.create(req.body);
        // const temp_set = new Set(result.posts);
        // console.log(result._id);
        let final_result = await UserController.user_update_posts(result.user_id, result._id);
        const final_post = await postmodel.findById(result._id).lean();
        // console.log("hiiiiiii!");
        return res.status(200).json({message:"Success to create a post for this user and update user's posts field", data:final_post});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"server error, fail to create post", data:error});
    }
};

// Display post delete form on GET.
exports.post_delete = async(req, res) => {
    try{
        let result = await postmodel.deleteOne({_id: req.params.id});
        return res.status(200).json({message:"Success to delete post with id:"+req.params.id, data:result});
    }
    catch(error){
        res.status(500).json({message:"fail to delete post for id:"+req.params.id, data:error});
    }};

// Display post update form on PUT.
exports.post_update = async(req, res) => {
    // console.log("post update body:" + req.body.referred_paper_id);
  try{
    if(req.body.referred_paper_id){
        let result = await postmodel.findOneAndUpdate({ _id: req.body.id }, { like_users: Array.from(new Set(req.body.like_users)), referred_paper_id:req.body.referred_paper_id }, { new: true });
        return res.status(200).json({message:"Success to update post with id:"+req.body.id, data:result});
    }
    else{
        let result = await postmodel.findOneAndUpdate({ _id: req.body.id }, { like_users: Array.from(new Set(req.body.like_users))}, { new: true });
        return res.status(200).json({message:"Success to update post with id:"+req.body.id, data:result});
    }
  }
  catch(error){
    res.status(500).json({message:"fail to update post for id:"+req.body.id, data:error});
  }
};

