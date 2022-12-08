// const papermodel = require('../models/paper_model');
// const postmodel = require('../models/post_model');
const usermodel = require('../models/user_model');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');

// Display list of all users.
exports.user_list = async(req, res) => {
  const arg = req.query;
  const params = new URLSearchParams(arg);
  var query = {};
  params.forEach((val,key) => {
      query[key] = JSON.parse(val);
  });
  var user = null;
  try {
      if (!params.count) {
          user = await usermodel.find(query.where, query.select).sort(query.sort).skip(query.skip).limit(query.limit);
          if(user){
              res.status(200).json({message:"Success", data:user});
          }else{
              res.status(404).json({message:"No user matched", data:null});
          }
      } else {
          user = await usermodel.find(query.where, query.select).sort(query.sort).skip(query.skip).limit(query.limit).count();
          if(user){
              res.status(200).json({message:"Success", data:user});
          }else{
              res.status(404).json({message:"No user matched", data:null});
          }
      }
  } catch(err) {
      res.status(404).json({message:"Server error, fail to get users' list", data:null});
  }};

// Display detail page for a specific user.
exports.user_detail = async(req, res) => {
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({message:"Not found: no matched user for id "+req.params.id, data:null});
    }
        
    const user = await usermodel.findById(req.params.id).lean();
    if(!user){
        return res.status(404).json({message:"Not found: no matched user for id "+req.params.id, data:null});
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
exports.user_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: user delete GET");
};

// Handle user delete on POST.
exports.user_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: user delete POST!");
};

// Display user update form on GET.
// exports.user_update_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: user update GET");
// };

// Handle user update on POST.
// exports.user_update_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: user update POST");
// };