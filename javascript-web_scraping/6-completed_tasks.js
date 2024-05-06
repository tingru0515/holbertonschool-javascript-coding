#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];

// Function to compute the number of completed tasks by user id
function countCompletedTasks(apiUrl) {
  return new Promise((resolve, reject) => {
    request.get(apiUrl, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        reject(`Failed to retrieve todo information. Status code: ${response.statusCode}`);
        return;
      }

      const todos = JSON.parse(body);
      const completedTasks = {};

      todos.forEach((todo) => {
        if (todo.completed) {
          if (completedTasks[todo.userId]) {
            completedTasks[todo.userId]++;
          } else {
            completedTasks[todo.userId] = 1;
          }
        }
      });

      resolve(completedTasks);
    });
  });
}

// Call the function and print the result
countCompletedTasks(apiUrl)
  .then((completedTasks) => console.log(completedTasks))
  .catch((error) => console.error(error));
