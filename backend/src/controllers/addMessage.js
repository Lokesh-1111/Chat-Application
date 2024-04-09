const Message = require('../models/MessageModel')

const addMessage = async (req,res,next)=>{
    try {
        const {to,from,message} = req.body;
        const userMsg = await Message.create({
            message:message,
            user:[from,to],
            receiver:to,
            sender:from
        })

        const data = await userMsg.save()
        if(data) return res.json({msg:"Message send successfully",status:true})
        return res.json({msg:"Failed to send message",status:false})

    } catch (error) {
        next(error)
    }


}

module.exports = addMessage