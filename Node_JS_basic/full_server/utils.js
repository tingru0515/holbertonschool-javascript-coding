const fs = require('fs').promises;

async function readDatabase(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    // Remove the first row of the csv file
    lines.shift();

    const dict = {};
    for (const each of lines) {
      const line = each.split(',');
      const key = line[3];
      const value = line[0];
      // if the key doesn't exist in the dict, initialise it with empty array
      if (!dict[key]) {
        dict[key] = [];
      }
      dict[key].push(value);
    }

    return dict;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = readDatabase;
