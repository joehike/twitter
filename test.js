var http = require('http');
var assert = require('assert');

var opts = {
	port: 3000,
	hostname: '127.0.0.1',
	path: '/send',
	method: 'POST',
	headers: {'content-type':'application/x-www-form-urlencoded'}
};

var req = http.request(opts,function (res) {
	res.setEncoding('utf8');

	var data = "";
	res.on('data',function (d) {
		data += d;
	});
	res.on('end',function () {
		assert.strictEqual(data,'{"status":"ok","message":"Tweet received"}');
	});
});

req.write('tweet=我也不知道写些什么东西');
req.end();