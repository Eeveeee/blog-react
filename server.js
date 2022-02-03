import express from 'express';
import * as path from 'path';
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
