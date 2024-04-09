const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userChatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
        // required:true,
    },
    avatarImage: {
        type: String,
        default: "",
        // required:true,
    },
})


userChatSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const chatSchema = new mongoose.model('chatSchema', userChatSchema);

module.exports = chatSchema


