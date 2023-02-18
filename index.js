const fs = require('fs')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors())
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
 });
 
app.get('/:state', function(req, res){
    res.sendFile(__dirname + '/views/state.html');
 });

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});