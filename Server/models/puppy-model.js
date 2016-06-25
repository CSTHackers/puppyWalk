// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var puppySchema = new Schema({
    dog_id: {
        type: String,
        required: true,
        unique: true
    },
    dog_name: {
        type: String,
        required: true
    },
    dog_gender:{
        type: String
    },
    dog_friends:[String],
    dog_isOnline: {type: Boolean, default: true}
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Puppies = mongoose.model('Puppies', puppySchema);

// make this available to our Node applications
module.exports = Puppies;