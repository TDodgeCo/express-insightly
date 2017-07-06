const express = require('express');
const app = express();
const request = require('request');
const http = require('http');

const leadOptions = { method: 'GET',
  url: 'https://api.insight.ly/v2.2/Leads',
  headers: {
    'postman-token': '9f3e85f7-41df-9912-a454-998db210e4f9',
    'cache-control': 'no-cache',
    authorization: 'Basic ZWMxODc0YmItMzZmMi00ZWRmLWE2MWItYzc4NjU1MzAzN2M1'
  }
 };

 const opportunityOptions = { method: 'GET',
   url: 'https://api.insight.ly/v2.2/Opportunities',
   headers: {
     'postman-token': '9f3e85f7-41df-9912-a454-998db210e4f9',
     'cache-control': 'no-cache',
     authorization: 'Basic ZWMxODc0YmItMzZmMi00ZWRmLWE2MWItYzc4NjU1MzAzN2M1'
   }
  };

app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
  console.log('listening on port 3000')
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})


app.get('/lead', function(req, res, next) {
request(leadOptions, function (error, response, body) {
  if (error) throw new Error(error);

  const contact = {body}
})
.pipe(res);
});


// get a list of all opportunities from insightly
app.get('/opportunity', function(req, res, next) {
request(opportunityOptions, function (error, response, body) {
  if (error) throw new Error(error);

  const contact = {body}
})
.pipe(res);
});
