const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    startDate:{
        type:String,
        required: true
    },
    endDate:{
       type:String,
       required: true
    },
    startTime:{
        type:String,
        required: true
    },
    endTime:{
            type:String,
            required: true
    },
    roomId:{
        type:mongoose.Types.ObjectId,
        required: true,
        ref:"rooms"
    },
    status:{
        type:String,
        default:"not booked"
    }
})

const user = mongoose.model('users', userSchema);

module.exports = user;