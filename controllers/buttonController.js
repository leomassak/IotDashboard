const Buttons = require('../models/buttons.js');

const Handler = require('../mqtt_handler.js');

var arrayMqtt = new Array();

function fieldValidation(button){

    var errors = [];

    if (!button.nome || button.nome == undefined || button.nome == null) {
        errors.push({
            texto: 'Invalid Button name'
        });
    }


    if (!button.link || button.link == undefined || button.link == null) {
        errors.push({
            texto: 'Invalid Button link'
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

    async store(req, res){
        try{
            if(fieldValidation(req.body)){
 
                    console.log('criando botão');

                    const newButton = await Buttons.create(req.body);
                    return res.status(200).json({newButton});
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

    async show(req, res){
        try{

         const buttons = await Buttons.find({buttonuser: req.params.username});

         arrayMqtt = [];

         for (let i = 0; i < buttons.length; i++) {
            var handler = new Handler();

            handler.connect();

            arrayMqtt[i] = handler;      
             
         }

         return res.status(200).json({buttons});
        }
        catch(err){
            return res.status(404).json({error: err});
        }
    }
};