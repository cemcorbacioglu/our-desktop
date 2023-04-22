const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

let mostRecentWallpaper = null;

app.use(express.static('public'));

app.get('/latest-wallpaper', (req, res) => {
  if (mostRecentWallpaper) {
    res.sendFile(mostRecentWallpaper);
  } else {
    res.status(404).json({ error: 'No wallpaper uploaded yet' });
  }
});

app.post('/upload', upload.single('wallpaper'), (req, res) => {
  if (req.file) {
    mostRecentWallpaper = path.join(__dirname, req.file.path);
    res.status(200).json({ message: 'File uploaded successfully' });
  } else {
    res.status(400).json({ error: 'No file received' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
