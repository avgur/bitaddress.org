var _static = require('node-static'),
  http = require('http'),
  util = require('util'),
  config = require('./config')();
  
var file = new(_static.Server)(config.webroot, { cache: config.staticCache });

http.createServer(function(req, res) {
    req.addListener('end', function() {
        file.serve(req, res, function(err, result) {
            if (err) {
                console.error('Error serving %s - %s', req.url, err.message);
                if (err.status === 404) {
                    file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
                } else {
                    res.writeHead(err.status, err.headers);
                    res.end();
                }
            } else {
                console.log('%s', req.url);
            }
        });
    });
}).listen(config.port);

console.log('node-static running at http://localhost:%d', config.port);