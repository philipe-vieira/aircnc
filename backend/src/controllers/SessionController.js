// index  (listar todas)
// show   (listar uma unica)
// store  (salvar/criar)
// update (editar/atualizar)
// destroy(deletar) 
const User = require('../models/User')
module.exports = {
    async store (req, res){
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) user = await User.create({ email });
        
        return res.json(user);
    }
};