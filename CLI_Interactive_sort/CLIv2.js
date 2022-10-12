const readline = require('readline');
const { choiceQuestion, hello, bye, help, $continue } = require('./question');
require('colors');

const rl = readline.createInterface({
  input: process.stdin, output: process.stdout
});

rl.on('close', () => console.log(bye));

const again = () => {
  rl.setPrompt($continue);
  rl.prompt();
  rl.on('line', userInput => {
    if (userInput.toLowerCase() === 'y') {
      question();
    } else {
      rl.close();
    }
  });
}

const question = () => {
  rl.question(hello, answer => {
    rl.question(choiceQuestion, number => {
      answer = answer.trim().split(' ');
      switch (number.toLowerCase().trim()) {
        case '1':
          console.log(answer.filter(el => {
            if (isNaN(Number(el))) {
              return el;
            }
          }).sort());
          again();
          break;
        case '2':
          console.log(answer.filter(el => {
            if (!isNaN(Number(el))) {
              return el;
            }
          }).sort((a, b) => a - b));
          again();
          break;
        case '3':
          console.log(answer.filter(el => {
            if (!isNaN(Number(el))) {
              return el;
            }
          }).sort((a, b) => b - a));
          again();
          break;
        case '4':
          console.log(answer.filter(el => {
            if (isNaN(Number(el))) {
              return el;
            }
          }).sort((a, b) => a.length - b.length));
          again();
          break;
        case '5':
          console.log([...new Set(answer.filter(el => {
            if (isNaN(Number(el))) {
              return el;
            }
          }))]);
          again();
          break;
        case '6':
          console.log([...new Set(answer)]);
          again();
          break;
        default:
          rl.close();
      }
    });
  });
}

question();
