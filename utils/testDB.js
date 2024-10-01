// testDB.js

const dbClient = require('./utils/db');

(async () => {
  console.log('Is MongoDB alive:', dbClient.isAlive());
  console.log('Number of users:', await dbClient.nbUsers());
  console.log('Number of files:', await dbClient.nbFiles());
})();