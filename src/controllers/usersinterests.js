// import async from 'async';
// import validator from 'validator';

import Usersinterests from '../models/usersinterests';
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

	// exports.list = (req, res) => {

	// 	// Usersdeals.findByTitle(req.params.id)
	// 	Usersdeals.find({})

	// 		.then(
	// 			followmarker => {
	// 				res.json(followmarker);		
	// 			}
	// 		)
	// 		.catch(err => {
	// 			logger.error(err);
	// 			res.status(422).send(err.errors);
	// 		});
	// };

	exports.list = (req, res) => {

		console.log("Nombre Usuario " + req.params.username);

		Usersinterests.find({})
		.populate(
			{
	  			path: 'userid',
	  			model: 'User',
	  			match: {
			      name: { "$regex": '.*' + req.params.username + '.*', "$options": 'i' }			      
			    }
			})
		.populate({
	  			path: 'typeid',
	  			model: 'Typemarker',
			})
			.then(
				interestsResponse => {
					console.log("Resouesta " + interestsResponse);
					res.json(interestsResponse);		

				}
			)
			.catch(err => {
				logger.error(err);
				res.status(422).send(err.errors);
			});
	};

	exports.listaux = (req, res) => {

		console.log("Nombre Usuario " + req.params.username);

		Usersinterests.find({})
		.populate(
			{
	  			path: 'userid',
	  			model: 'User',
	  			match: {
			      username: { "$regex": '.*' + req.params.username + '.*', "$options": 'i' }			      
			    }
			})
		.populate({
	  			path: 'typeid',
	  			model: 'Typemarker',
			})
			.then(
				interestsResponse => {
					console.log("Resouesta " + interestsResponse);
					res.json(interestsResponse);		

				}
			)
			.catch(err => {
				logger.error(err);
				res.status(422).send(err.errors);
			});
	};	

	exports.get = (req, res) => {

		// console.log("[*] GET");

		// Usersdeals.findByTitle(req.params.id)
		//Usersdeals.count({userid: req.params.userid, markerid: req.params.markerid, status: true})
		Usersinterests.find({userid: req.params.userid})
	// .populate(
	// {
 //  		path: 'typeid',
 //  		model: 'Typemarker'
	// })
			.then(
				interestsResponse => {
					res.json(interestsResponse);		
				}
			)
			.catch(err => {
				logger.error(err);
				res.status(422).send(err.errors);
			});
	};

// exports.get = (req, res) => {

// 		// Usersdeals.findByTitle(req.params.id)
// 		Usersdeals.find({userid: req.params.userid, dealid: req.params.dealid})
// 		// Usersdeals.find({title: { "$regex": '.*' + req.params.titlemarker + '.*', "$options": 'i' }}).populate(
// 		// {
// 	 //  		path: 'type',
// 	 //  		model: 'Typemarker'
// 		// })
// 		// Usersdeals.findById(req.params.markerId)
// 		// Dealsprofile.find({ date_expire: {"$gte": todayStart}})
// 			.then(
// 				marker => {
// 					res.json(marker);		
// 				}
// 			)
// 			.catch(err => {
// 				logger.error(err);
// 				res.status(422).send(err.errors);
// 			});
// };


// exports.put = (req, res) => {

// 	console.log(req);
// 	const data = req.body || {};

// 	Usersdeals.findOneAndUpdate({ userid: req.params.userid, markerid: req.params.markerid }, data, { new: true })
// 		.then(marker => {
// 			if (!marker) {
// 				return res.sendStatus(404);
// 			}
// 			res.json(marker);
// 		})
// 		.catch(err => {
// 			logger.error(err);
// 			res.status(422).send(err.errors);
// 		});
// };

exports.post = (req, res) => {

	var userInterestsPost = new Usersinterests(req.body);

	console.log("Controller Intersts " + JSON.stringify(userInterestsPost));

	userInterestsPost.save()
	.then(userInterestsSave => {
		res.json(userInterestsSave);
	})
	.catch(err => {
		logger.error(err);
		res.status(500).send(err);
	});	
};


exports.delete = (req, res) => {

	console.log("BACKEND DELETE " + req.params.userid);

	Usersinterests.deleteMany(
		{ userid: req.params.userid }
	)
		.then(userint => {
			if (!userint) {
				return res.sendStatus(404);
			}
			const response = {
        		message: "Todo successfully deleted",
    		};
			res.json(response);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};