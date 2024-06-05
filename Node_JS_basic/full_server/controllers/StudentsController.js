const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const dict = await readDatabase(process.argv[2]);
      let result = 'This is the list of our students';
      for (const key in dict) {
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
          // add a space in front of each name except the first one
          const newValue = dict[key].map((name) => (dict[key].indexOf(name) === 0 ? name : ` ${name}`));
          result += `\nNumber of students in ${key}: ${dict[key].length}. List: ${newValue}`;
        }
      }
      res.status(200).send(result);
      res.end();
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const { major } = req.params;
      if (major !== 'CS' && major !== 'SWE') {
        res.status(500).send('Major parameter must be CS or SWE');
        return res.end();
      }
      const dict = await readDatabase(process.argv[2]);
      let result = '';
      for (const key in dict) {
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
          if (key === major) {
            // add a space in front of each name except the first one
            const newValue = dict[key].map((name) => (dict[key].indexOf(name) === 0 ? name : ` ${name}`));
            result = `List: ${newValue}`;
          }
        }
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
