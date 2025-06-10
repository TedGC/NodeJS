const fs = require('fs')

// fs.writeFileSync('notes.txt', 'My name is Andrew.')

fs.appendFileSync('notes.txt', ' I live in Philadelphia.')



const fs = require('fs');

fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});