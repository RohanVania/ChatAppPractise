const express = require('express');
const {Server}=require("socket.io");
const cors=require("cors");
const app = express();

app.use(cors())

let users=[];

const server=app.listen(4005, (data) => {
    console.log("Server listening on Port 4005 ", data)
})
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000'
    }
})

io.on('connection',(socket)=>{
    console.log("Connection Established ",socket.id)

    socket.on('newUser',(data)=>{
        users.push(socket.id);
        socket.emit('newUserAdded',users);
    })

  
})

app.get("/", (req, res) => {
    res.send("Hello")
    // res.sendFile(__dirname + '/index.html')
})






