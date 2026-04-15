import inquirer from 'inquirer';
import fs from "fs";

export async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'device',
      message: 'Select device:',
      choices: ['pc', 'tab', 'mob'],
    },
    {
      type: 'input',
      name: 'url',
      message: 'Enter website URL:',
    },
    {
      type: 'list',
      name: 'referenceType',
      message: 'Select reference type:',
      choices: [
        { name: 'Figma URL', value: 'figma' },
        { name: 'Local file', value: 'file' },
      ],
    },
    {
      type: 'input',
      name: 'figmaUrl',
      message: 'Enter Figma URL:',
      when: (ans) => ans.referenceType === 'figma',
    },
    {
      type: 'input',
      name: 'filePath',
      message: 'Enter local file path:',
      when: (ans) => ans.referenceType === 'file',
      validate: (input) => {
        const clean = input
          .trim()
          .replace(/^['"]|['"]$/g, "")
          .replace(/\\ /g, " ");

        return fs.existsSync(clean) || "File does not exist";
      },
    },
    {
      type: 'list',
      name: 'enableAI',
      message: 'Generate AI UI audit?',
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false }
      ]
    },
  ]);

  return answers;
}