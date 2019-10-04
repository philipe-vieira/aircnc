const Spot = require('../models/Spot');
const User = require('../models/User');


module.exports = {
    async index(req, res){
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res){
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: 'user does not exist'});
        }

        const spot = await Spot.create({
            thumbnail: filename,
            company: company,
            price: price,
            techs: techs.split(',').map(tech => tech.trim()),
            user: user_id,
        })

        return res.json(spot);
    }
}