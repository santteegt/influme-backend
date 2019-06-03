const Usersdeals = require('../controllers/usersdeals');

module.exports = api => {
	api.route('/usersdeals/search/:userId').get(Usersdeals.list);
	api.route('/usersdeals/search/one/:userId/:dealId').get(Usersdeals.get);
	// api.route('/usersdeals/search/:userId').get(Usersdeals.get);
	// api.route('/usersmarker/:userid/:markerid').get(Usersdeals.get);
	// api.route('/usersmarker/:titlemarker').get(Usersdeals.get);

	// api.route('/usersmarker/update/:userid/:markerid').put(Usersdeals.put);
	api.route('/usersdeals/').post(Usersdeals.post);
	// api.route('/usersmarker/:userfollowId').delete(Usersdeals.delete);
};