import mongoose, { Schema } from 'mongoose';


export const DealsprofileSchema = new Schema({
        conditions: {
            type: String, 
            required: true, 
        },                  
        img: {
            type: String, 
            required: true,
        },        
        markerid: {
            type: Schema.Types.ObjectId, ref: 'markerprofile'
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