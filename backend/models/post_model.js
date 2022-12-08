// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var PostSchema = new mongoose.Schema({
    user_id: {type: String, required:true},
    user_name: {type: String, required:true},
    content: {type: String, required:true},
    created_date: {type: Date, default: Date.now()},
    like_users: {type: [{type: String}], default:[]},
    referred_paper_id: {type: String},
    research_field: {type: String, required:true}
});

// Export the Mongoose model
module.exports = mongoose.model('post_model', PostSchema);