import Usersinterests from '../controllers/usersinterests';

module.exports = api => {
	// api.route('/usersmarker').get(Usersdeals.list);
	// api.route('/usersmarker/:userid/:markerid').get(Usersdeals.get);
	// api.route('/usersmarker/:titlemarker').get(Usersdeals.get);

	// api.route('/usersmarker/update/:userid/:markerid').put(Usersdeals.put);
	api.route('/usersinterests/:userid').get(Usersinterests.get);
	// api.route('/usersmarker/:userfollowId').delete(Usersdeals.delete);
};