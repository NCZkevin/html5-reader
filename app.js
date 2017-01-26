var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./views',{
  map: {html: 'ejs'}
});
var koa_static = require('koa-static-server');
var service = require('./service/webAppService');
app.use(koa_static({
  rootDir: './static/',
  rootPath: '/static/',
  maxage: 0
}))

app.use(controller.get('/route_test',function*(){
  this.body = "hello koa";
}));

app.use(controller.get('/ejs_test',function*(){
  this.body = yield render('test',{title:'test'});
}));

app.use(controller.get('/api_test',function*(){
  this.body = service.get_test_data();
}));

app.use(controller.get('/search',function*(){
  var querystring = require('querystring');
  var params = querystring.parse(this.req._parsedUrl.query);
  var start = params.start;
  var end = params.end;
  var keyword = params.keyword;
  this.body = yield service.get_search_data(start,end,keyword);
}));

app.listen(3001);
console.log("koa server is started");
