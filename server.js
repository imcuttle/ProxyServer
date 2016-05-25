/**
 * Created by Yc on 2016/5/25.
 */

var proxy=require('http-proxy').createProxyServer({});

proxy.on(function(err,req,res){
    res.writeHead(500,{'Content-Type':'text/plain'});
});
proxy.on('error', function(err, req, res) {
    res.end();
})
var server=require('http').createServer(function(req,res){

    var host= req.headers.host;
    console.log(host);
    switch(host){
        case 'paintgame.moyuyc.xyz':
            proxy.web(req,res,{target:'http://localhost:4000'});
            break;
        case 'paint.moyuyc.xyz':
            proxy.web(req, res, { target: 'http://localhost:4001' });
            break;
        case 'moyuyc.xyz':
            proxy.web(req, res, { target: 'http://localhost:8080' });
            break;
        case 'www.moyuyc.xyz':
            proxy.web(req, res, { target: 'http://localhost:8080' });
            break;
        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Not Found,Thanks');
    }
});

console.log("listening on port 80");

server.listen(80);