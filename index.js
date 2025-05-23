import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let guestbookEntries = [];

app.get('/guestbook', (req, res) => {
  res.json(guestbookEntries);
});

app.post('/guestbook', (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    const newEntry = { name, message, date: new Date().toLocaleString() };
    guestbookEntries.push(newEntry);

    fs.writeFileSync('guestbook.json', JSON.stringify(guestbookEntries, null, 2));

    res.status(200).json({ success: true, entry: newEntry });
  } else {
    res.status(400).json({ error: 'Name and message are required' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});