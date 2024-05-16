const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const lines = data.split('\n');
    let students = lines.filter((line) => line).slice(1);

    students = students
      .map((student) => student.split(','))
      .filter((student) => student.length === 4);

    console.log(`Number of students: ${students.length}`);

    const fields = {};
    for (const student of students) {
      if (!fields[student[3]]) fields[student[3]] = [];
      fields[student[3]].push(student[0]);
    }

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        console.log(
          `Number of students in ${field}: ${
            fields[field].length
          }. List: ${fields[field].join(', ')}`,
        );
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
