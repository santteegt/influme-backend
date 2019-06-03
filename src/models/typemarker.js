const mongoose  = require('mongoose');


const TypemarkerSchema = new mongoose.Schema({
        description: {
        	type: String, 
        	required: true, 
        },
        icontype: {
            type: String, 
            required: true, 
        },                           
        iconimg: {
            type: String, 
            required: true, 
        },                
    },
    { collection: 'typemarker' }
);

// Export the model
module.exports = mongoose.model('Typemarker', TypemarkerSchema);