import mongoose, { Schema } from 'mongoose';


export const UsersdealsSchema = new Schema({
        userid: {
            type: Schema.Types.ObjectId, ref: 'users'
        },
        dealid: {
            type: Schema.Types.ObjectId, ref: 'dealsprofile'
        },        
    },
    { collection: 'usersdeals' }
);

// Export the model
module.exports = mongoose.model('Usersdeals', UsersdealsSchema);