import mongoose, { Schema } from 'mongoose';


export const TypemarkerSchema = new Schema({
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