import mongoose, { Schema } from 'mongoose';


export const UsersmarkerSchema = new Schema({
        userid: {
            type: Schema.Types.ObjectId, ref: 'users'
        },
        markerid: {
            type: Schema.Types.ObjectId, ref: 'users'
        },        
        status:{
        	type: Boolean, 
        	required: true,        	
        }
    },
    { collection: 'usersmarker' }
);

// Export the model
module.exports = mongoose.model('Usersmarker', UsersmarkerSchema);