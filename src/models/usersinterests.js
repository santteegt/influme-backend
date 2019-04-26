import mongoose, { Schema } from 'mongoose';


export const UsersinterestsSchema = new Schema({
        userid: {
            type: Schema.Types.ObjectId, ref: 'users'
        },
        typeid: {
            type: Schema.Types.ObjectId, ref: 'typemarker'
        },        
    },
    { collection: 'usersinterests' }
);

// Export the model
module.exports = mongoose.model('Usersinterests', UsersinterestsSchema);