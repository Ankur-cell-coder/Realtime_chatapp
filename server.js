//exporting expresss
const express = require('express');

const app=express();

//const http=require('http');

//const server=http.createServer(app);

//creating webserver
//import http and and call functions on them

const http=require('http').createServer(app);

const PORT = process.env.PORT||3000;

http.listen(PORT,()=>{
    console.log(`listining on PORT ${PORT}`);
})

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})


//socket
//import socket
const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('connected...')
    //listening message which are emit from client site
    socket.on('message',(msg)=>{
       // console.log(msg)
       socket.broadcast.emit('message',msg)
    })
})
