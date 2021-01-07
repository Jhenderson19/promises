/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification.js').getGitHubProfileAsync;



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return pluckFirstLineFromFileAsync(readFilePath)
    .then( (data) => {
      console.log('data ->', data);
      return getGitHubProfileAsync(data);
    })
    .then( (profile) => {
      console.log('profile -> ', profile);
      return JSON.stringify(profile);
    })
    .then( (profileString) => {
      return Promise.promisify(fs.writeFile)(writeFilePath, profileString);
    })
    .catch( (err) => {
      if (err) {
        console.log('err -> ', err );
      } else {
        console.log('worked');
      }
    });


};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
