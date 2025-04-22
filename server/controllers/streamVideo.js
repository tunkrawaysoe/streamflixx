import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const streamVideo = (req, res) => {
  const safeFilename = path.basename(req.params.filename);
  console.log(safeFilename);
  const videoPath = path.join(__dirname, '../uploads', safeFilename);
  console.log(videoPath)

  if (!fs.existsSync(videoPath)) return res.sendStatus(404);

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) return res.status(416).send('Requires Range header');

  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  if (start >= fileSize || end >= fileSize) {
    return res.status(416).send('Requested range not satisfiable');
  }

  const chunkSize = end - start + 1;
  const file = fs.createReadStream(videoPath, { start, end });

  file.on('error', (err) => {
    console.error('Stream error:', err.message);
    res.sendStatus(500);
  });

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, headers);
  file.pipe(res);
};

export const getVideoMetadata = (req, res) => {
  const safeFilename = path.basename(req.params.filename);
  const videoPath = path.join(__dirname, '../../uploads', safeFilename); // Ensure correct relative path

  console.log('Video path:', videoPath); // For debugging

  if (!fs.existsSync(videoPath)) return res.sendStatus(404);

  const stat = fs.statSync(videoPath);
  res.status(200).json({
    size: stat.size,
    contentType: 'video/mp4',
    acceptRanges: 'bytes',
  });
};
