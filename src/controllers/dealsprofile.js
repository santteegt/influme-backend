// const async from 'async';
// const validator from 'validator';

const Dealsprofile = require('../models/dealsprofile');
const Markerprofile = require('../models/markerprofile');
const Typemarker  = require('../models/typemarker');
// const Follow from '../models/follow';

const logger  = require('../utils/logger');

// exports.list = (req, res) => {
// 	const params = req.params || {};
// 	const query = req.query || {};

// 	const page = parseInt(query.page, 10) || 0;
// 	const perPage = parseInt(query.per_page, 10) || 10;

// 	User.apiQuery(req.query)
// 		.select('name email username bio url twitter background')
// 		.then(users => {
// 			res.json(users);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };

exports.list_by_business = (req, res) => {
	
	Dealsprofile.find({markerid: req.params.bussinesid})

		.then(
			dealsmarker => {
				res.json(dealsmarker);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.list = (req, res) => {
	
	Dealsprofile.find({})

		.then(
			dealsmarker => {
				res.json(dealsmarker);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};



exports.get_deals_available_by_marker = (req, res) => {

	var todayStart = new Date();
	todayStart.setHours(0,0,0,0);

	Dealsprofile.find({ date_expire: {"$gte": todayStart},
		"$where" : "this.used_tickets < this.total_tickets"})

	.then( responseDeals => {	
		res.json(responseDeals);
		console.log(res);
	}).catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});

};


exports.get = (req, res) => {

	var todayStart = new Date();
	todayStart.setHours(0,0,0,0);

	Dealsprofile.find({ date_expire: {"$gte": todayStart},
		"$where" : "this.used_tickets < this.total_tickets"}).populate(
	{
  		path: 'markerid',
  		model: 'Markerprofile',
  		populate: {
			path: 'type',
    		model: 'Typemarker'
  		}
	}).then( responsemarker => {	
		res.json(responsemarker);
		console.log(res);
	}).catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});

};

exports.getDeals = (req, res) => {

	var todayStart = new Date();
	todayStart.setHours(0,0,0,0);

	var markerInterest = req.params.markerId.split(",");;

	// Dealsprofile.find({ markerid: {$in: req.params.markerId}, 
	Dealsprofile.find({ markerid: {$in: markerInterest}, 
		"$where" : "this.used_tickets < this.total_tickets", 
		date_expire: {"$gte": todayStart}
		}).populate(
	{
  		path: 'markerid',
  		model: 'Markerprofile',
  		populate: {
			path: 'type',
    		model: 'Typemarker'
  		}
	}
	)
	.then( responsemarker => {
		res.json(responsemarker);
		console.log(res);
	}).catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});
		
};



exports.getTrendingDeals = (req, res) => {

	var todayStart = new Date();
	todayStart.setHours(0,0,0,0);

	Dealsprofile.find(
		{
			"$where" : "this.used_tickets < this.total_tickets",
			// used_tickets: {"$gt": 6},
			hotdeal: "Yes",
			date_expire: {"$gte": todayStart}
		}
	).populate(
	{
  		path: 'markerid',
  		model: 'Markerprofile',
  		populate: {
			path: 'type',
    		model: 'Typemarker'
  		}
	}
	)
	.then( responshdeals => {
		res.json(responshdeals);
		console.log(res);
	}).catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});
		
};

exports.getOneDeal = (req, res) => {

	// Dealsprofile.find({markerid: req.params.nameMarker})

	Dealsprofile.findById(req.params.dealId)
	.then(deal => {
		res.json(deal);
	})
	.catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});

	// Dealsprofile.find({ markerid: req.params.markerId})
	// .then( responsemarker => {
	// 	res.json(responsemarker);
	// 	console.log(res);
	// }).catch(err => {
	// 	logger.error(err);
	// 	res.status(422).send(err.errors);
	// });
		
};

exports.get_dealandbusiness = (req, res) => {


	Dealsprofile.findById(req.params.dealId).populate(
	{
  		path: 'markerid',
  		model: 'Markerprofile',
	}
	)
	.then(deal => {
		res.json(deal);
	})
	.catch(err => {
		logger.error(err);
		res.status(422).send(err.errors);
	});
		
};

exports.put = (req, res) => {

	const data = req.body || {};

	console.log("[*] PUT deals profile " + data);

	// if (data.email && !validator.isEmail(data.email)) {
	// 	return res.status(422).send('Invalid email address.');
	// }

	// if (data.username && !validator.isAlphanumeric(data.username)) {
	// 	return res.status(422).send('Usernames must be alphanumeric.');
	// }

	Dealsprofile.findOneAndUpdate({ _id: req.params.dealId }, data, { new: true })
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.post = (req, res) => {
	var dealsp = new Dealsprofile(req.body);
	// const data = Object.assign({}, req.body) || {};
	console.log("[*]" + JSON.stringify(dealsp));

	dealsp.save()
		.then(dealsresponse => {
			res.json(dealsresponse);
		})
		.catch(err => {
			logger.error(err);
			// res.json({error: err});
			res.status(500).send(err);

		});
};

exports.delete = (req, res) => {
	Dealsprofile.findOneAndDelete({_id: req.params.dealid})
		.then(dealqr => {

			res.sendStatus(204);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

// exports.post = (req, res) => {
// 	var markerp = new Markerprofile(req.body);
// 	// const data = Object.assign({}, req.body) || {};
// 	console.log("[*]" + JSON.stringify(markerp));

// 	markerp.save()
// 		.then(marker => {
// 			res.json(marker);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(500).send(err);
// 		});
// };

// exports.delete = (req, res) => {
// 	User.findByIdAndUpdate(
// 		{ _id: req.params.user },
// 		{ active: false },
// 		{
// 			new: true
// 		}
// 	)
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			res.sendStatus(204);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };