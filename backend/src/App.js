const express = require('express');
const app = express();
require('./db/conn');
const cors = require('cors');
const router = require('./routers/routers');
const messageRouter = require('./routers/messageRouter')
const socket = require('socket.io')

const port = process.env.PORT||8000;


app.use(cors())
app.use(express.json());

app.use('/message',messageRouter)

app.use('/api',router);

app.get('/',(req,res)=>{
    res.send('This is home page');
})

const server = app.listen(port,()=>{
    console.log(`This is port no. ${port}`);
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    // console.log("user connected",socket.id)
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on('send-msg',(data)=>{
        const sendUserMessage = onlineUsers.get(data.to);
        if(sendUserMessage){
            socket.to(sendUserMessage).emit('message-receive',data.msg)
        }
    })

})



