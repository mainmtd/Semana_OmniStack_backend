//Importação do Mongoose
const mongoose = require('mongoose');

//Modelagem de usuário com banco
const UserSchema = new mongoose.Schema({
    email: String,
});

module.exports = mongoose.model('User', UserSchema);