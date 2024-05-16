const fs = require('fs');

function countStudents(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf-8');
    const students = data.split('\n').slice(1);

    const studentsCS = [];
    const studentsSWE = [];

    for (const student of students) {
      const data = student.split(',');

      if (data[3] === 'CS') {
        // hardcode
        studentsCS.push(data[0]);
      }

      if (data[3] === 'SWE') {
        // hardcode
        studentsSWE.push(data[0]);
      }
    }

    console.log(
      `Number of students: ${studentsCS.length + studentsSWE.length}`,
    );
    console.log(
      `Number of students in CS: ${studentsCS.length}. List: ${studentsCS.join(
        ', ',
      )}`,
    );
    console.log(
      `Number of students in SWE: ${
        studentsSWE.length
      }. List: ${studentsSWE.join(', ')}`,
    );
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
