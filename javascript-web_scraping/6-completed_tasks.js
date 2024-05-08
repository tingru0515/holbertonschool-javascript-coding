#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const tasks = JSON.parse(body);
  const completed = {};
  for (const task of tasks) {
    if (task.completed === true) {
      if (completed[task.userId] === undefined) {
        completed[task.userId] = 1;
      } else {
        completed[task.userId] = completed[task.userId] + 1;
      }
    }
  }
  console.log(completed);
});
