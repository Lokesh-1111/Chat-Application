const chatSchema = require('../models/Schema');
// const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userNameCheck = await chatSchema.findOne({username});
        if(userNameCheck){
            return res.json({msg:"User already exists",status:false});
        }

        // const hashPassword =await bcrypt.hash(password,10);
        
        const user = await chatSchema({
            username: username,
            email: email,
            password: password
        })
        const data = await user.save();
        return res.json({msg:"User Created Succesfully",status:true})


    } catch (error) {
        console.log(`this is error ${error}`);
        return res.json({msg:"Fill the form correctly",status:false})
    }
    // res.send(req.body);

}

module.exports = register;