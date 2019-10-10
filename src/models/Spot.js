//Importação do Mongoose
const mongoose = require('mongoose');

//Modelagem de spot com banco
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    },
});
//O segundo parâmetro indica algumas configurações no mongoose

//toJSON com virtuals: true determina que ao gerar o schema, aceite virtuals, como o abaixo:


//Cria um campo que não está representado no banco, apenas o javascript
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.0.11:3333/files/${this.thumbnail}`
});

module.exports = mongoose.model('Spot', SpotSchema);