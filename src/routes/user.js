const User = require('../controllers/user');

module.exports = api => {
	// api.route('/users').get(User.list);
	// api.route('/users/:userId').get(User.get);
	api.route('/users/search/influencer/:userId').get(User.get_if_influencer);		
	api.route('/users/search/all/request').get(User.all_users_request);
	api.route('/users/search/single/update/:userId/:tkuser').get(User.single_user);		
	api.route('/users/search/all').get(User.all_users);		
	api.route('/users/:username').get(User.get);	
	api.route('/users/update/:userId').put(User.put);
	api.route('/users/search/:username').get(User.list);
	api.route('/users/').post(User.post);
	// api.route('/users/:userId').delete(User.delete);
};