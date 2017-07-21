var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    multipart = require('connect-multiparty');

var app = express();

configureExpress(app);

exposeRoutes(app);

app.listen(3000);

console.log("Up and Running.");


function configureExpress(app){
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());

    app.use(methodOverride());

    app.use('/bower_components', express.static('./bower_components'));

    app.use(multipart({
	    uploadDir: __dirname + "/uploads"
    }));
}

function exposeRoutes(app){
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.post('/upload', function(req, res){
        console.log('File Name: ' + req.files.file.name);
        console.log('Another Form Data : ' + req.body.anotherData);
        console.log("Check /uploads .");
        res.end();
    });
}