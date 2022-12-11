// const papermodel = require('../models/paper_model');
// const postmodel = require('../models/post_model');
const usermodel = require('../models/user_model');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');

exports.CheckUserById = async(user_id)=>{
  // console.log("user_id:"+user_id);
  if(!mongoose.Types.ObjectId.isValid(user_id)){return false;}
  const query = await usermodel.findById(user_id);
  if(query){return query;}
  return false;
}

// Display list of all users.
exports.user_list = async(req, res) => {
  var user = null;
//   console.log("params:"+req.params);
  try {
    user = await usermodel.find(req.query.where, req.query.select).sort(req.query.sort).skip(req.query.skip).limit(parseInt(req.query.limit));
    if(user){
      res.status(200).json({message:"Success", data:user});
    }else{
      res.status(404).json({message:"No user matched", data:null});
    }
  } catch(err) {
      res.status(404).json({message:"Server error, fail to get users' list", data:null});
  }};

// Display detail page for a specific user.
exports.user_detail = async(req, res) => {
    // console.log(req.query.email);
  try{    
    const user = await usermodel.findOne({ email:req.query.email });
    if(!user){
        return res.status(404).json({message:"Not found: no matched user for email "+req.query.email, data:null});
    }else{
        return res.status(200).json({message:"Success", data:user});
    }
  }
  catch(error){
    res.status(500).json({message:"server error, fail to get a certain user info", data:error});
  }
};

// Handle user create on POST.
exports.user_create = async(req, res) => {
  // console.log("params:"+req.params);
  const val_err = validationResult(req);
  if(!val_err.isEmpty()){
      return res.status(400).json({message:"new user validation failed", data:val_err.array()});
  }
  try{
      let result = await usermodel.create(req.body);
      return res.status(200).json({message:"Success", data:result});
  }
  catch(error){
      res.status(500).json({message:"server error, fail to create user", data:error});
  }
};

// Display user delete form on GET.
exports.user_delete = async(req, res) => {
  try{
      let result = await usermodel.deleteOne({_id: req.params.id});
      return res.status(200).json({message:"Success to delete user with id:"+req.params.id, data:result});
  }
  catch(error){
      res.status(500).json({message:"fail to delete user for id:"+req.params.id, data:error});
  }
};

// Display user update form on PUT.
exports.user_update = async(req, res) => {  
  console.log("see here!!"+req.body.favourite_papers);
  try{
    if((req.body.favourite_papers.length) > 0){
      // console.log("hihihi");

      let result = await usermodel.findOneAndUpdate({ _id: req.params.id }, { favourite_papers: Array.from(new Set(req.body.favourite_papers))} , { new: true });
      // console.log("check duplicate papers here?"+result);
      return res.status(200).json({message:"Success to update user with user_id:"+req.params.id, data:result});
    }
    else{
      let result = await usermodel.findOneAndUpdate({ _id: req.params.id }, {favourite_papers: []}, { new: true });
      return res.status(200).json({message:"Success to update user with empty favourite paper list with user_id:"+req.params.id, data:result});
    }
  }
  catch(error){
    res.status(500).json({message:"fail to update user for id:"+req.params.id, data:error});
  }
};

// Update user's posts field when a user is creating new posts
exports.user_update_posts = async(user_id, new_post) => {
  // console.log("1");

  const query = await usermodel.findById(user_id);
  const temp_set = new Set(query.posts);
  // console.log("old temp_set:"+ temp_set.size);

  temp_set.add(new_post);
  // console.log("new temp_set:"+Array.from(temp_set));

  let result = await usermodel.findOneAndUpdate({ _id: user_id }, {posts: Array.from(temp_set)}, { new: true });
  // console.log("result here:"+result);
  return result;
};