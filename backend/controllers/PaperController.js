const papermodel = require('../models/paper_model');
// const postmodel = require('../models/post_model');
// const usermodel = require('../models/user_model');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');

// Display list of all papers.
exports.paper_list = async(req, res) => {
  const arg = req.query;
  const params = new URLSearchParams(arg);
  var query = {};
  params.forEach((val,key) => {
      query[key] = JSON.parse(val);
  });
  var paper = null;
  try {
      if (!params.count) {
          paper = await papermodel.find(query.where, query.select).sort(query.sort).skip(query.skip).limit(query.limit);
          if(paper){
              res.status(200).json({message:"Success", data:paper});
          }else{
              res.status(404).json({message:"No paper matched", data:null});
          }
      } else {
          paper = await papermodel.find(query.where, query.select).sort(query.sort).skip(query.skip).limit(query.limit).count();
          if(paper){
              res.status(200).json({message:"Success", data:paper});
          }else{
              res.status(404).json({message:"No paper matched", data:null});
          }
      }
  } catch(err) {
      res.status(404).json({message:"Server error, fail to get papers' list", data:null});
  }
};

// Display detail page for a specific paper.
exports.paper_detail = async(req, res) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message:"Not found: no matched paper for id "+req.params.id, data:null});
        }
        
        const paper = await papermodel.findById(req.params.id).lean();
        if(!paper){
            return res.status(404).json({message:"Not found: no paper data for id "+req.params.id, data:null});
        }else{
            return res.status(200).json({message:"Success", data:paper});
        }
    }
    catch(error){
        res.status(500).json({message:"server error, fail to get a certain paper info", data:error});
    }
};

// Handle paper create on POST.
exports.paper_create = async(req, res) => {
    const val_err = validationResult(req);
    if(!val_err.isEmpty()){
        return res.status(400).json({message:"new paper validation failed", data:val_err.array()});
    }
    try{
        let result = await papermodel.create(req.body);
        return res.status(200).json({message:"Success", data:result});
    }
    catch(error){
        res.status(500).json({message:"server error, fail to create paper", data:error});
    }
};

// Display paper delete form on GET.
exports.paper_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: paper delete GET");
};

// Handle paper delete on POST.
exports.paper_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: paper delete POST");
};

// Display paper update form on GET.
// exports.paper_update_get = (req, res) => {
//     res.send("NOT IMPLEMENTED: paper update GET");
// };

// Handle paper update on POST.
// exports.paper_update_post = (req, res) => {
//     res.send("NOT IMPLEMENTED: paper update POST");
// };