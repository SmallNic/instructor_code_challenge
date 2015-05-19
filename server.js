var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require("body-parser")

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

//I couldn't get Postman to work, so I created a form on the homepage that would get the name and oid and then submit them to the post /favorites route.
app.get('/', function(req, res){
  res.send("<form method='post' action='/favorites'><input type='text' name='name' placeholder='Enter your name...'><input type='text' name='oid' placeholder='Enter your oid...'><input type='submit' value='Submit'></form>")
})

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
