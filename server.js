/*jshint esversion: 6 */
let express = require('express'),
    morgan = require('morgan'),
    http = require('http'),
    dishRouter = require('./dishRouter'),
    leaderRouter = require('./leaderRouter'),
    promoRouter = require('./promoRouter');

let hostname = '71.164.175.158';
let port = 3000;

let app = express();

app.use(morgan('dev'));

app.use('/dishes',dishRouter);

app.use('/leadership',leaderRouter);

app.use('/promotions',promoRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}`);
});
