import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { SUPPORTED_FILE_TYPES, FileUploadResponse } from '../types';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req: any, file: any, cb: any) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024, // 50KB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (SUPPORTED_FILE_TYPES[ext]) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Upload file endpoint
router.post('/upload', upload.single('file'), (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      } as FileUploadResponse);
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Validate content length
    if (content.length > 10000) { // 10KB text limit
      fs.unlinkSync(filePath); // Delete the file
      return res.status(400).json({
        success: false,
        error: 'File content too large (max 10KB)'
      } as FileUploadResponse);
    }

    res.json({
      success: true,
      filename: req.file.filename,
      content,
      fileType: ext.substring(1) // Remove the dot
    } as FileUploadResponse);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process file'
    } as FileUploadResponse);
  }
});

// Get supported file types
router.get('/supported-types', (req: any, res: any) => {
  res.json({ supportedTypes: SUPPORTED_FILE_TYPES });
});

export default router;
