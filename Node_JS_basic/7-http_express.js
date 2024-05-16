const express = require('express');

const port = 1245;
const app = express();
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const lines = data.split('\n');
    let students = lines.filter((line) => line).slice(1);

    students = students
      .map((student) => student.split(','))
      .filter((student) => student.length === 4);

    const fields = {};
    for (const student of students) {
      if (!fields[student[3]]) fields[student[3]] = [];
      fields[student[3]].push(student[0]);
    }

    return `Number of students: ${students.length}\nNumber of students in CS: ${
      fields.CS.length
    }. List: ${fields.CS.join(', ')}\nNumber of students in SWE: ${
      fields.SWE.length
    }. List: ${fields.SWE.join(', ')}`;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const students = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${students}`);
  } catch (error) {
    res.status(500).send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
