const Usersinterests = require('../controllers/usersinterests');

module.exports = api => {
	// api.route('/usersmarker').get(Usersdeals.list);
	// api.route('/usersmarker/:userid/:markerid').get(Usersdeals.get);
	// api.route('/usersmarker/:titlemarker').get(Usersdeals.get);

	api.route('/usersinterests/').post(Usersinterests.post);
	api.route('/usersinterests/:userid').get(Usersinterests.get);
	api.route('/usersinterests/search/full/:userid').get(Usersinterests.getFull);
	api.route('/usersinterests/search/:username').get(Usersinterests.list);
	api.route('/usersinterests/search/nick/:username').get(Usersinterests.listaux);
	api.route('/usersinterests/delete/:userid').delete(Usersinterests.delete);
};