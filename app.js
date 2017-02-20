var express = require('express');// 引入express的模块
var app = express();// 获得express创建的服务器
var bodyParser = require('body-parser');// post 请求解析
var path = require('path');
var partials = require('express-partials');

app.listen(3000);// 使服务器监听在3000端口

// 设置渲染器
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(partials());
// 静态网页请求
app.use(express.static(path.join(__dirname, 'public')));

var tweets = [];

// 查看是否接受html文件
function acceptsHtml(header) {
	//console.log(header);
	var accepts = header.split(',');
	for (var i = 0; i < accepts.length; i++) {
		if(accepts[i] === 'text/html'){
			return true;
		}
	}
	return false;
}

app.get('/info', function (req, res) {
	var title = '推特-风筝';
	var header = '欢迎 风筝';
	res.render('info',{
		locals: {
			'title':title,
			'header':header,
			'tweets':tweets,
			stylesheets:['/stylesheets/style.css']
		}
	});
});

app.get('/', function (req, res) {// 响应 / 请求
	// res.send('Welcome to Node Twitter');
	var title = '推特-风筝';
	var header = '欢迎 风筝';

	res.render('index',{
		locals: {
			'title':title,
			'header':header,
			'tweets':tweets,
			stylesheets:['/stylesheets/style.css']
		}
	});

});

// 解析 application/x-www-form-urlecoded 的请求
app.use(bodyParser.urlencoded({extended:false}));
// 解析 application/json
app.use(bodyParser.json());
app.post('/send', function (req, res) {
	// 测试
	console.log(req.body);

	if(req.body && req.body.tweet) {
		// tweets.push(req.body.tweet);
		tweets.unshift(req.body.tweet);
		// console.log(req.headers);
		if (acceptsHtml(req.headers['accept'])) {
			res.redirect(302,'/');
		} else {
			res.send({status:"ok", message:"Tweet received"});
		}


	} else {
		// 没有 tweet ?
		res.send({status:"nok", message:"No tweet reveived"});
	}
});

app.get("/tweets", function (req, res) {
	res.send(tweets);
});


