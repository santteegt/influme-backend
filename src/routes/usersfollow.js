const Usersfollow = require('../controllers/usersfollow');

module.exports = api => {
	api.route('/usersfollow/report/followers/:userid').get(Usersfollow.getFollowers);
	api.route('/usersfollow/report/following/:userid').get(Usersfollow.getFollowing);
	api.route('/usersfollow/:userid/:useridfollow').get(Usersfollow.get);
	// api.route('/usersfollow/:userid').get(Usersfollow.get);
	// api.route('/usersmarker/:titlemarker').get(Usersmarker.get);

	api.route('/usersfollow/update/:userid/:useridfollow').put(Usersfollow.put);
	api.route('/usersfollow/').post(Usersfollow.post);
	// api.route('/usersmarker/:userfollowId').delete(Usersmarker.delete);
};