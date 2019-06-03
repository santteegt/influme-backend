const Typemarker = require('../controllers/typemarker');

module.exports = api => {
	api.route('/typemarker').get(Typemarker.list);
	api.route('/typemarker/:id').get(Typemarker.get);
	// api.route('/users/:userId').put(User.put);
	// api.route('/markerprofile/').post(Typemarker.post);
	// api.route('/users/:userId').delete(User.delete);
};