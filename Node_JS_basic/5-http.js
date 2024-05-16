const http = require('http');

const port = 1245;
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

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (req.url === '/students') {
    try {
      const data = await countStudents(process.argv[2]);
      res.write(`This is the list of our students\n${data}`);
      res.end();
    } catch (error) {
      res.write(`This is the list of our students\n${error.message}`);
      res.end();
    }
  }
});

app.listen(port);

module.exports = app;
