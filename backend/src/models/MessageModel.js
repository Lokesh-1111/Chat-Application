const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user:Array,
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }   
},
{
    timestamps: true
})

const messageModel = new mongoose.model("Message",MessageSchema);

module.exports = messageModel


