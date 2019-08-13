const mongoose  = require('mongoose');


const MarkerprofileSchema = new mongoose.Schema({
        title: {
            type: String, 
            required: true, 
        },
        instagramid: {
            type: String, 
            required: true, 
        },        
        shortdescription: {
            type: String, 
            required: true
        },
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: 'typemarker'
        },

        lat: {
            type: Number, 
            required: true
        },
        lon: {
            type: Number, 
            required: true
        },
        web: {
            type: String, 
            required: true
        },
        followers: {
            type: Number, 
            required: true
        },
        address: {
            type: String, 
            required: true
        },
        images: [{
            type: String, 
            required: true
        }]
    },
    { collection: 'markerprofile' }
);

// Export the model
module.exports = mongoose.model('Markerprofile', MarkerprofileSchema);