//importação de pacotes
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

//inicialização do express
const app = express();

const server = http.Server(app);
const io = socketio(server)




//Conecta ao banco de dados mongoose
mongoose.connect('mongodb+srv://iventura:iventura@omnistack-1vmqg.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {
    
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors());
//Diz pro express que os dados trafegarão em formato json
app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
//Diz ao app para usar as rotas definidas no arquivo routes.js
app.use(routes);



server.listen(3333);