#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];
const characterId = '18';
// Function to count movies where Wedge Antilles is present
function countMoviesWithCharacter(apiUrl, characterId) {
  return new Promise((resolve, reject) => {
    request.get(apiUrl, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        reject(`Failed to retrieve movie information. Status code: ${response.statusCode}`);
        return;
      }

      const films = JSON.parse(body).results;
      let count = 0;

      films.forEach((film) => {
        const characters = film.characters;
        if (characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
          count++;
        }
      });

      resolve(count);
    });
  });
}

// Call the function and print the result
countMoviesWithCharacter(apiUrl, characterId)
  .then((count) => console.log(count))
  .catch((error) => console.error(error));
