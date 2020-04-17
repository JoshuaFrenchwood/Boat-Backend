const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//Boat Model Design and Restrictions
const BoatSchema = new Schema({
    name:{
        type:String,
        default: "ABS",
        unique:true
    },

    direction:{
        type: Number
    },

    speed:{
        type: Number
    },

    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Boat = mongoose.model('boat', BoatSchema);