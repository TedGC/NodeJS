const fs = require('fs')

// fs.writeFileSync('notes.txt', 'My name is Andrew.')

fs.appendFileSync('notes.txt', ' I live in Philadelphia.')

// read a file asynchronously 

const fs = require('fs');

fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

//write to file
fs.writeFile('./output.txt', 'Hello Node.js!', err => {
    if (err) throw err;
    console.log('File written!');
});