const Inboxmessages = require('../models/inboxmessages');
const logger  = require('../utils/logger');


exports.get = (req, res) => {

	Inboxmessages.find().populate(
	{
  		path: 'dealid',
  		model: 'Dealsprofile'
	}).then( responseInbox => {	
		res.json(responseInbox);
		console.log(res);
	}).catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});

};
