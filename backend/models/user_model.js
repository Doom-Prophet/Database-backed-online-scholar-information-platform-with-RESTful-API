// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    user_name: {type: String, required:true},
    email: {type: String, required:true},
    // password: {type: String, required:true},
    research_field: {type: String, required:true},
    posts: {type: [{type: String}], default:[]},
    favourite_papers: {type: [{type: String}], default:[]}
});

// Export the Mongoose model
module.exports = mongoose.model('user_model', UserSchema);
