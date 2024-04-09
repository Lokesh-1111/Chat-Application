const Message = require('../models/MessageModel');

const getMsg = async (req,res,next)=>{
    try {
        const {from,to} = req.body

        const messages = await Message
        .find({user:{$all:[from,to]}})
        .sort({updateAt:1})


        const projectedMessage = messages.map((msg) => {
            return {
              fromSelf: msg.sender.toString() === from,
              message: msg.message,
            };
          });
        return res.json(projectedMessage)


    } catch (error) {
        next(error)
    }
}

module.exports = getMsg