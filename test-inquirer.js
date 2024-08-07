const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'entityName',
      message: 'What is the name of the entity?',
    },
  ])
  .then((answers) => {
    console.log(`Entity name: ${answers.entityName}`);
  })
  .catch((error) => {
    console.error(error);
  });
