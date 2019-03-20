// import async from 'async';
// import validator from 'validator';

import Dealsprofile from '../models/dealsprofile';
import Markerprofile from '../models/markerprofile';
import Typemarker from '../models/typemarker';
// import Follow from '../models/follow';

import logger from '../utils/logger';

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

exports.get = (req, res) => {

	var todayStart = new Date();
	todayStart.setHours(0,0,0,0);

	// Dealsprofile.find({markerid: req.params.nameMarker})
	// Dealsprofile.find({ date_expire: {"$gte": todayStart}})

	// Dealsprofile.find({ date_expire: {"$gte": todayStart}})
	// 	.then(
	// 		dealsmarker => {
	// 			Markerprofile.populate(dealsmarker, {path: "markerid"})
	// 				.then(dealsmarker1 => {
	// 				// dealsmarker.markerid = markerid;
	// 					res.json(dealsmarker1);
 //  						// console.log(dealsmarker1.markerid);
 //  					}
 //  					)
	// 				.catch(err => {
	// 					logger.error(err);
	// 					res.status(422).send(err.errors);
	// 				});
	// 			// res.json(dealsmarker);		
	// 		}
	// 	)
	// 	.catch(err => {
	// 		logger.error(err);
	// 		res.status(422).send(err.errors);
	// 	});


	Dealsprofile.find({ date_expire: {"$gte": todayStart}, 
		"$where" : "this.used_tickets < this.total_tickets"}).populate(
	{
  		path: 'markerid',
  		model: 'Markerprofile',
  		populate: {
			path: 'type',
    		model: 'Typemarker'
  		}
	}
	).then( responsemarker => {
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
	// Dealsprofile.find({markerid: req.params.nameMarker})

	Dealsprofile.find({ markerid: req.params.markerId, 
		"$where" : "this.used_tickets < this.total_tickets", 
		date_expire: {"$gte": todayStart}
		})
	.then( responsemarker => {
		res.json(responsemarker);
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

// exports.put = (req, res) => {
// 	const data = req.body || {};

// 	if (data.email && !validator.isEmail(data.email)) {
// 		return res.status(422).send('Invalid email address.');
// 	}

// 	if (data.username && !validator.isAlphanumeric(data.username)) {
// 		return res.status(422).send('Usernames must be alphanumeric.');
// 	}

// 	User.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
// 		.then(user => {
// 			if (!user) {
// 				return res.sendStatus(404);
// 			}

// 			user.password = undefined;
// 			user.recoveryCode = undefined;

// 			res.json(user);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };

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