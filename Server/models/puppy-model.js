var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var puppySchema = new Schema({
    dog_id: {
        type: String,
    },

    dog_password: {
        type: String,
        required: false
    },
    dog_login_id:{
        type:String

    },
    // dog_location:{
    //     dog_lat:{
    //         type:Number
    //     },
    //     dog_long:{
    //         type:Number
    //     }
    // },
    dog_name: {
        type: String,
        required: false
    },
    dog_gender:{
        type: String
    },
    dog_friends:[String],
    dog_isOnline: {type: Boolean, default: false},
    contact_phoneNo: false
}, {
    timestamps: true
});


var Puppies = mongoose.model('Puppies', puppySchema);
module.exports = Puppies;