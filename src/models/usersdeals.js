const mongoose = require('mongoose');


const UsersdealsSchema = new mongoose.Schema({
        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users'
        },
        dealid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'dealsprofile'
        },        
    },
    { collection: 'usersdeals' }
);

// Export the model
module.exports = mongoose.model('Usersdeals', UsersdealsSchema);