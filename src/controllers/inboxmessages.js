const Inboxmessages = require('../models/inboxmessages');
const logger  = require('../utils/logger');



exports.get_one_msj = (req, res) => {

	Inboxmessages.find({_id: req.params.msjid }).populate(
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


exports.get = (req, res) => {

	var todayStart = new Date();
	todayStart.setHours(0,0,0,0);


	Inboxmessages.find({enabled: true, expirationdate: {"$gte": todayStart} }, null, {sort: {datepost: -1}}).populate(
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

exports.get_all_msj = (req, res) => {

	Inboxmessages.find({enabled: true }, null, {sort: {datepost: -1}}).populate(
	{
  		path: 'dealid',
  		model: 'Dealsprofile',
  		populate: {
			path: 'markerid',
    		model: 'Markerprofile'
  		}
  		

	}).then( responseInbox => {	
		res.json(responseInbox);
		console.log(res);
	}).catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});

};

exports.post = (req, res) => {

	var msjPost = new Inboxmessages(req.body);

	msjPost.save()
	.then(msjsave => {
		res.json(msjsave);
	})
	.catch(err => {
		logger.error(err);
		res.status(500).send(err);
	});	
};

exports.put = (req, res) => {

	const data = req.body || {};

	Inboxmessages.findByIdAndUpdate({ _id: req.params.msjid }, data, { new: true })
		.then(msj => {
			if (!msj) {
				return res.sendStatus(404);
			}
			res.json(msj);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};