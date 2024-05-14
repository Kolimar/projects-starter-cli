#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createDirectoryContents from './createDirectoryContents.js';
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'starter-template',
    type: 'list',
    message: 'Qué template quieres utilizar?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Nombre del proyecto:',
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Los nombres de los proyectos solo pueden contener letras, números, guiones y guiones bajos.';
    },
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['starter-template'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  createDirectoryContents(templatePath, projectName);
});
