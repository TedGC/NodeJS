const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const p = path.status(404).join(path.dirname(__dirname, '../', 'data', 'products.json'))

// the script above is to the modifiied version to represent the coee below 
// to reflect the udpated content of NodeJS recently

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);


// in order to sync it with the 'readFile' function, it needs to have 
// callback functions 

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }


  // need to have have a callback function at the end for fs.writeFile
  // as a mandatory source to run the code below 
  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  // just like save() function above, the fetchAll function in "Controller" should
  // have a callback function to reflect the factor above 
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
