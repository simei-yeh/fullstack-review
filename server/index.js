const express = require('express');
const git = require('../helpers/github.js')

let app = express();


app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body.username);
  git.getReposByUsername(req.body.username, (err, data) => {
    // console.log(data)
    // if (err) {
    //   res.status(400).send(data)
    // } else {
    //   res.status(201).send(data)
    // }
  })
  res.sendStatus(200);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

