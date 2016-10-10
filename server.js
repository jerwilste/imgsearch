var express = require('express');
var Search = require('bing.search');
var util = require('util');
var app = express();
var port = process.env.PORT || '8080';
var search = new Search('GUhJ/8aBAnYUDcWwsh896cA8cH17AeXnTeJSAg3KtdM');
var recentSearch = [];

app.get('/', function(req, res){
	res.send('image search api');
	res.end();
});
app.get('/search/:query', function(req, res){
	var resultStart = req.query.offset *10;
	search.images(req.params.query, {top: 10, skip: resultStart}, function(err, results){
		recentSearch.push({query: req.params.query});
		res.end(JSON.stringify(results));
	});
});
app.get('/latest', function(req, res){
	res.end(JSON.stringify(recentSearch));
	
});
app.listen(port);

function handleResults(err, results){
	//res.send(results);
	return results;
}

