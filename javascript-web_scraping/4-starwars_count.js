#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const films = JSON.parse(body).results;
  let count = 0;
  for (const film of films) {
    for (const character of film.characters) {
      const characterId = character.split('/').filter(Boolean).pop();
      if (characterId === '18') {
        count = count + 1;
      }
    }
  }
  console.log(count);
});
