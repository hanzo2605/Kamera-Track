const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

app.post('/upload', (req, res) => {
  const { image } = req.body;

  if (!image) return res.status(400).send('No image data');

  const base64Data = image.replace(/^data:image\/png;base64,/, '');
  const filename = `capture-${Date.now()}.png`;

  fs.writeFileSync(path.join(__dirname, filename), base64Data, 'base64');
  res.send('Gambar berhasil disimpan!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
