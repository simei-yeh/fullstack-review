const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  let token = config.TOKEN || process.env.API_KEY;
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  axios(options)
  .then((response) => {
    db.save(response.data, (err, data) => {
      if (err) {throw err;}
      else {
        callback(err, data)
      }
    });
  })
  .catch((err) => {
    callback(err)
  })


}

module.exports.getReposByUsername = getReposByUsername;