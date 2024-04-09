const chatSchema = require('../models/Schema');


const getUsers = async (req, res) => {
    try {
        const id = req.params.id

        const users = await chatSchema.find({_id:{$ne:id}}).select([
            "username",
            "email",
            "avatarImage",
            "_id"
        ])
        return res.json(users);
    } catch (error) {
        res.json(error)
    }
}



module.exports = getUsers