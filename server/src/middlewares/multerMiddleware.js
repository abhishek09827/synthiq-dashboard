import multer from 'multer';
import path from 'path';

// Define storage settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    } catch (error) {
      console.error('Error setting destination:', error);
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    try {
      // Set the file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    } catch (error) {
      console.error('Error generating filename:', error);
      cb(error, null);
    }
  }
});

// File filter function to validate file types
const fileFilter = (req, file, cb) => {
  try {
    const allowedTypes = /jpeg|jpg|png|svg|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only images (jpeg, jpg, png, svg) and PDFs are allowed.'));
    }
  } catch (error) {
    console.error('Error filtering file:', error);
    cb(error, null);
  }
};

// Multer middleware to handle the file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // Set file size limit (5MB in this case)
  fileFilter: fileFilter
});

export default upload;
