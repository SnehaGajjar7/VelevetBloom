import express from 'express';
import multer from 'multer';
import path from 'path';
import { getMessages, submitMessage } from '../controllers/contactController.js';

const contactRouter = express.Router();

// Multer setup inside router file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Use multer middleware for single image upload on field "image"
contactRouter.post('/', upload.single('image'), submitMessage);

contactRouter.get('/', getMessages);

export default contactRouter;
