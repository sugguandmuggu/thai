const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = 5000;

// MongoDB setup (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/thaiIdOCR', { useNewUrlParser: true, useUnifiedTopology: true });

// OCR process middleware
const ocrMiddleware = multer().single('file');
app.post('/api/ocr', ocrMiddleware, async (req, res) => {
  try {
    const { buffer } = req.file;
    const { data } = await Tesseract.recognize(buffer, 'eng', { logger: (info) => console.log(info) });
    // Parse OCR results and save to MongoDB (not implemented in this example)
    const parsedData = {}; // Implement your parsing logic here
    res.json(parsedData);
  } catch (error) {
    console.error('Error processing OCR:', error);
    res.status(500).json({ error: 'Error processing OCR' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
