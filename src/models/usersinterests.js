const mongoose = require('mongoose');


const UsersinterestsSchema = new mongoose.Schema({
        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users'
        },
        typeid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'typemarker'
        },        
    },
    { collection: 'usersinterests' }
);

// Export the model
module.exports = mongoose.model('Usersinterests', UsersinterestsSchema);