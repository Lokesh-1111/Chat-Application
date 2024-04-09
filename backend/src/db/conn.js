const mongoose = require('mongoose');

const connectdb = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Chat');
        console.log('db connected successfully');
    } catch (error) {
        console.log(`This is error ${error}`);
    }
}


connectdb();