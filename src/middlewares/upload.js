const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv') return cb(new Error('Only CSV files are allowed'), false);
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
