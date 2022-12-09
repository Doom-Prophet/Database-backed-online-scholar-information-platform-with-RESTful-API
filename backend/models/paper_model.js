// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var PaperSchema = new mongoose.Schema({
    paper_name: {type: String, required:true},
    year: {type: Number, required:true},
    authors: {type: [{type: String}], default:[]},
    citations: {type: Number, required:true},
    abstract: {type: String, required:true},
    venue: {type: String, required:true}
    // posts_who_mentioned: {type: [{type: String}], default:[]}
});

// Export the Mongoose model
module.exports = mongoose.model('paper_model', PaperSchema);