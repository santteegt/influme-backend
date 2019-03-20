import mongoose, { Schema } from 'mongoose';


export const MarkerprofileSchema = new Schema({
        title: {
        	type: String, 
        	required: true, 
        },
        shortdescription: {
        	type: String, 
        	required: true
        },
        type: {
            type: Schema.Types.ObjectId, ref: 'typemarker'
        },

        lat: {
        	type: Number, 
        	required: true
        },
        lon: {
        	type: Number, 
        	required: true
        },
        picturehome: {
        	type: String, 
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
        	type:  String, 
        	required: true
        }]
    },
    { collection: 'markerprofile' }
);

// Export the model
module.exports = mongoose.model('Markerprofile', MarkerprofileSchema);