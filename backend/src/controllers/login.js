const chatSchema = require('../models/Schema');
const bcrypt = require('bcrypt');

const login = async (req,res)=>{
    // console.log("Login");
    const {username,password} = req.body;

    try {
        // console.log("Inside login")
        const user =await chatSchema.findOne({username})
        if(!user){
            return res.json({msg:"User does not exists",status:false})
        }
        else{
            const pass =await bcrypt.compare(password,user.password);
            // console.log(pass);
            if(pass){
                return res.json({status:true,user})
            }
            else{
                return res.json({msg:"Enter Valid Credentials",status:false})
            }
        }
    } catch (error) {
        console.log(`This is error ${error}`);
    }
}

module.exports = login;