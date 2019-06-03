const mongoose = require('mongoose');


const UsersmarkerSchema = new mongoose.Schema({
        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users'
        },
        markerid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users'
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