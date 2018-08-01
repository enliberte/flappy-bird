query = require('querystring')
express = require('express');
Client = require('pg');
app = express();
port = process.env.PORT || 8000;

//создаем подключение к БД
client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true}
);
client.connect();

client.query('SELECT name FROM users;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
   client.end();
});

//отдача статики
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
    console.log('App is running on port ' + port);
});
