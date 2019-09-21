const mongoose = require('mongoose');


const DealsqrcodeSchema = new mongoose.Schema({
        codeqr: {
            type: String, 
            required: true, 
        },
        dealid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'dealsprofile',
            required: true,
        },        
        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users',
            required: false, 
        },
        isused: {
            type: Boolean, 
            required: false, 
        },
        dateused: {
            type: Date, 
            required: false, 
        },                
    },
    { collection: 'dealsqrcode' }
);

// Export the model
module.exports = mongoose.model('Dealsqrcode', DealsqrcodeSchema);