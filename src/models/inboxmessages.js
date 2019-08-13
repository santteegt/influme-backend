const mongoose = require('mongoose');
// const Schema = require('mongoose');


const InboxmessagesSchema = new mongoose.Schema({
        title: {
            type: String, 
            required: true, 
        },  
        hour: {
            type: String, 
            required: true, 
        },
        description: {
            type: String, 
            required: true, 
        },
        dealid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'dealsprofile'
        },
                        
    },
    { collection: 'inboxmessages' }
);

// Export the model
module.exports = mongoose.model('Inboxmessages', InboxmessagesSchema);