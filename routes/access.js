exports.login = function(req, res) {
	res.render('access/login', { title: 'Inicia sesión' });
};

exports.signup = function(req, res) {
	res.render('access/signup');
};

exports.request = function(req, res) {
	res.render('access/request');
}