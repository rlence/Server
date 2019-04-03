const fs = require('fs');
const path = require("path")
const read = ()=> {
       const dataString = fs.readFileSync(path.join(__dirname,'../data/data.json'));
       const data = JSON.parse(dataString);
       return data;
}

module.exports = read; 