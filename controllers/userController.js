const Users = require('../models/users.js');

function fieldValidation(user){

    var errors = [];

    if (!user.username || user.username == undefined || user.username == null) {
        errors.push({
            texto: 'Invalid Username'
        });
    }


    if (!user.password || user.password == undefined || user.password == null) {
        errors.push({
            texto: 'Invalid Password'
        });
    }
  
    if (user.password < 6) {
        errors.push({
            texto: 'Min 6 characters'
        });
    }

    if (errors.length > 0) {
        return false;
    }
    else{
        return true;
    }
}


module.exports = {
   
    async authUser(req, res) {
       try{
           if(fieldValidation(req.body)){

           const userFound = await Users.findOne({username: req.body.username})
            
            if(userFound){
                //if(req.body.password === userFound.password){
                    return res.status(200).json(userFound);
                //}
                /*else{
                    return res.json({error: 'Senha inválida...'});
                }*/
            }
            else{
                return res.json({error: 'Usuário inválido'});
            }
            
           }
        else{
            return res.json({error: 'Campos incompletos'});
        }
       }            
        catch(err){
            console.log(err);
            return res.json({error: err});
        }    
    },

    async store(req, res){
        try{
            if(fieldValidation(req.body)){
 
                //Verifica se o nome de usuario já existe
                if(await Users.findOne({username: req.body.username})){
                    return res.json({error: 'Usuário já existe'});
                }

               
                    console.log('criando conta');

                    const newUser = await Users.create(req.body);
                    return res.status(200).json({newUser});
           }
           else{
               return res.json({error: 'Campos não preenchidos'});
           }
        }
        catch(err){
            console.log(err);
            res.json({error: err});
        }

    },

    async update(req, res){
        try{
            
           let userUpdated = await Users.findOneAndUpdate({_id: req.body.id}, req.body.user, {new: true});

           if(userUpdated){
               console.log('Updated!');
               return res.status(200).json({userUpdated});
           }

        }
        catch(err){
            return res.json({error: err});
        }
    }
};