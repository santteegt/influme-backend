const mongoose = require('mongoose');


const UsersfollowSchema = new mongoose.Schema({
        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users'
        },
        useridfollow: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users'
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