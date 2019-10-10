const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    async index(req, res){
        const {tech} = req.query;

        const spots = await Spot.find({techs: tech})

        return res.json(spots);
    },

    async store(req, res){
        const {filename} = req.file;
        const {company, techs, price} = req.body;
        
        //Utilizado para pegar informações da sessão, como usuário, idioma,etc
        const {user_id} = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({error: 'Usuário não existe'});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            //trim remove espaço antes e depois do elemento
            techs: techs.split(',').map(tech => tech.trim()),
            price,
        })
        return res.json(spot)
    }
}