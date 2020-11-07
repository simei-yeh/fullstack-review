const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repo_id: Number,
  user_id: Number,
  repo_name: String,
  fullname: String,
  username: String,
  size: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('DB SAVE INVOCATION', data)
  let newDocs = [];


  if (data.length === 0) {
    return callback(404, 'user not found')
  } else {
    for (let i = 0; i < data.length; i++) {
      let newObj = {
        repoId: data[i].id,
        repoName: data[i].name,
        repoPath: data[i].full_name,
        userId: data[i].owner.id,
        username: data[i].owner.login,
        size: data[i].size,
        forks: data[i].forks_count
      }
      newDocs.push(newObj);
    }
  }

  console.log('ARRAY CREATE INVOCATION', newDocs);

  Repo.deleteMany({username: data[0].owner.login}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('deleted all possible');
      Repo.insertMany(newDocs, { ordered: true, rawResult: true }, (err, data) => {
        if (err) {
          callback(err)
        } else {
          callback(null, data)
        }
      })
    }
  })
}



module.exports.save = save;