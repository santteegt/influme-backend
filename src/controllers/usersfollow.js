const Usersfollow  = require('../models/usersfollow');

const logger  = require('../utils/logger');

exports.get = (req, res) => {

	Usersfollow.find({userid: req.params.userid, useridfollow: req.params.useridfollow})
		.then(
			usersfollow => {
				res.json(usersfollow);		
			}
		)
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};


exports.put = (req, res) => {

	console.log(req);
	const data = req.body || {};

	Usersfollow.findOneAndUpdate({ userid: req.params.userid, useridfollow: req.params.useridfollow }, data, { new: true })
		.then(userfollow => {
			if (!userfollow) {
				return res.sendStatus(404);
			}
			res.json(userfollow);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.post = (req, res) => {
	var followuser = new Usersfollow(req.body);

	followuser.save()
		.then(userf => {
			res.json(userf);
		})
		.catch(err => {
			logger.error(err);
			res.status(500).send(err);
		});
};