const express = require('express');
const app = express();
require('dotenv').config();

const http = require('http');
const path = require('path');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on("send-location", (data)=>{
        io.emit("receive-location", {id: socket.id, ...data});
    })
    
    socket.on('disconnect', () => {
        io.emit('user-disconnected', {id: socket.id});
    });
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});