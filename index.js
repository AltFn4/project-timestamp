// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  var unix = Date.now();
  return res.json({
    unix: unix,
    utc: new Date(unix).toUTCString(),
  });
})


app.get("/api/:dateStr", function (req, res) {
  var dateStr = req.params.dateStr;
  var unix = Date.parse(dateStr);

  if (isNaN(unix)) {
    unix = Number.parseInt(dateStr);
  }

  var utc = new Date(unix).toUTCString();

  if (isNaN(unix)) {
    res.json({
      error: utc
    });
  } else {
    res.json({
      unix: unix,
      utc: utc,
    });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
