import mongoose, { Schema } from 'mongoose';


export const UsersfollowSchema = new Schema({
        userid: {
            type: Schema.Types.ObjectId, ref: 'users'
        },
        useridfollow: {
            type: Schema.Types.ObjectId, ref: 'users'
        },        
        status:{
        	type: Boolean, 
        	required: true,        	
        }
    },
    { collection: 'usersfollow' }
);

// Export the model
module.exports = mongoose.model('Usersfollow', UsersfollowSchema);