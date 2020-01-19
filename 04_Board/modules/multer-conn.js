const multer = require('multer');
const path = require('path'); // basic object of node.js
const fs = require('fs');   // basic object of node.js

// Function expression with arrow function of ES6
const destination = (req, file, cb) => {
  cb(null, getPath());
};

// same as 'const storage = multer.diskStorage({destination, filename}) in ES6 if (key === value)'
const storage = multer.diskStorage({ // js object style
  destination: destination,
  filename: filename
});
const upload = multer({storage: storage});

// Function declaration
function filename(req, file, cb) {
    cb(null, getFilename(file.originalname));
}

function getPath() {
  let newPath = path.join(__dirname, "../uploads/"+makePath());
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  }
  return newPath;
}

function makePath() {
  let d = new Date();
  let year = d.getFullYear(); // 2020
  let month = d.getMonth();   // 0 (0~11)

  return (year%100)+ zp(month+1);
}

function zp(d) {
  return d<10 ? "0"+d : d; 
}

function getFilename(orgFile) {
  let ext = path.extname(orgFile);
  let name = path.basename(orgFile, ext);
  let dir = makePath(); // 2001
  let time = Date.now(); // timestamp
  let uniq = Math.floor(Math.random() * 90) + Math.floor(Math.random() * 10);

  return `${dir}-${time}-${uniq}`;
}

module.exports = {upload};
