const chatSchema = require('../models/Schema');

const setAvatar = async (req,res)=>{
    console.log("set Avatar")
    try {
        const id = req.params.id
    const image = req.body.image;

    const user = await chatSchema.findByIdAndUpdate(id,{
        isAvatarImageSet:true,
        avatarImage:image
    })

    res.json({isSet:user.isAvatarImageSet,status:true,image})

    } catch (error) {
        console.log(`This is error : ${error}`);
        res.json({msg:"try again later",status:false})
    }
}

module.exports = setAvatar