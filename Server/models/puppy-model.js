var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var puppySchema = new Schema({
    dog_id: {
        type: String,
        required: true,
        unique: true
    },

    dog_password: {
        type: String,
        required: true
    },
    dog_login_id:{
        type:String

    },
    dog_name: {
        type: String,
        required: true
    },
    dog_gender:{
        type: String
    },
    dog_friends:[String],
    dog_isOnline: {type: Boolean, default: false},
    contact_phoneNo: String
}, {
    timestamps: true
});


var Puppies = mongoose.model('Puppies', puppySchema);
module.exports = Puppies;