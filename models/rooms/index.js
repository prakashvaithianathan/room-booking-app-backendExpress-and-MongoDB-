const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    seats:{
       type:String,
       required: true
    },
    price:{
        type:String,
        required: true
    },
    amenities:{
        type: Array,
        required: true
    },
    bookings:[
        {
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'users'
        }
    ]
},{
    timestamps:true
})

const room = mongoose.model('rooms',roomSchema);

module.exports =room