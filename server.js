express = require('express');
app = express();
port = process.env.PORT || 8000;

//отдача статики
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
/*app.use(favicon(__dirname + '/public/yourfavicon.ico'));*/

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
    console.log('App is running on port' + port);
});