const mongoose = require('mongoose');
// const Schema = require('mongoose');


const DealsprofileSchema = new mongoose.Schema({
        title: {
            type: String, 
            required: true, 
        },    
        conditions: {
            type: String, 
            required: true, 
        },                  
        hotdeal: {
            type: String, 
            required: true,
        },        
        img: {
            type: String, 
            required: true,
        },        
        markerid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'markerprofile'
        },
        total_tickets: {
            type: Number, 
            required: true, 
        },
        used_tickets: {
            type: Number, 
            required: true, 
        },
        date_expire: {
            type: Date, 
            required: true, 
        },                        
    },
    { collection: 'dealsprofile' }
);

// Export the model
module.exports = mongoose.model('Dealsprofile', DealsprofileSchema);