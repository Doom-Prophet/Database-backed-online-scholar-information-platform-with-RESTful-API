// const papermodel = require('../models/paper_model');
const postmodel = require('../models/post_model');
// const usermodel = require('../models/user_model');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const { any } = require('async');

// Display list of all posts.
exports.post_list = async(req, res) => {
//   const arg = req.query;
//   const params = new URLSearchParams(arg);
//   var query = {};
//   params.forEach((val,key) => {
//       query[key] = val;
//   });
    var post = null;
//   console.log("post query:"+req.query.field);
    try {
        post = await postmodel.find({ research_field: { $regex: req.query.field}}).sort(req.query.sort).skip(req.query.skip).limit(parseInt(req.query.limit));
        if(post){
            res.status(200).json({message:"Success", data:post});
        }else{
            res.status(404).json({message:"No post matched", data:null});
        }
    //   if (!params.count) {
    //       post = await postmodel.find({ research_field: { $regex: req.query.field}}).sort(req.query.sort).skip(req.query.skip).limit(parseInt(req.query.limit));
    //       if(post){
    //           res.status(200).json({message:"Success", data:post});
    //       }else{
    //           res.status(404).json({message:"No post matched", data:null});
    //       }
    //   } else {
    //       post = await postmodel.find({ research_field: { $regex: req.query.field}}).sort(req.query.sort).skip(req.query.skip).limit(parseInt(req.query.limit)).count();
    //       if(post){
    //           res.status(200).json({message:"Success", data:post});
    //       }else{
    //           res.status(404).json({message:"No post matched", data:null});
    //       }
    //   }
    } catch(err) {
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
    try{
        let result = await postmodel.create(req.body);
        return res.status(200).json({message:"Success", data:result});
    }
    catch(error){
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

// Handle post delete on POST.
// exports.post_delete_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: post delete POST");
// };

// Display post update form on PUT.
exports.post_update = async(req, res) => {
    console.log("post update body:"+req.body.like_users);
  try{
    let result = await postmodel.findOneAndUpdate({ _id: req.body.id }, { like_users: req.body.like_users }, { new: true });
    return res.status(200).json({message:"Success to update post with id:"+req.body.id, data:result});
  }
  catch(error){
    res.status(500).json({message:"fail to update post for id:"+req.body.id, data:error});
  }
};

// Handle post update on POST.
// exports.post_update_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: post update POST");
// };