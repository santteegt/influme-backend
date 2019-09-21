const mongoose = require('mongoose');
// const Schema = require('mongoose');


const InboxmessagesSchema = new mongoose.Schema({
        title: {
            type: String, 
            required: true, 
        },  
        datepost: {
            type: Date, 
            required: true, 
        },
        expirationdate:{
            type: Date, 
            required: true,
        },
        description: {
            type: String, 
            required: true, 
        },
        dealid: {
            type: mongoose.Schema.Types.ObjectId, ref: 'dealsprofile'
        },
        enabled: {
            type: Boolean, 
            required: true,            
        }
                        
    },
    { collection: 'inboxmessages' }
);

// Export the model
module.exports = mongoose.model('Inboxmessages', InboxmessagesSchema);