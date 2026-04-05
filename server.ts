import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

const CROP_MOISTURE: Record<string, string> = {
  tomato: '70%',
  lettuce: '80%',
  corn: '60%',
  wheat: '50%',
  rice: '90%',
  soybean: '65%',
  potato: '75%',
  onion: '70%',
  garlic: '60%',
  carrot: '70%',
  cucumber: '80%',
  strawberry: '75%',
  blueberry: '70%',
  grape: '60%',
  apple: '65%',
  orange: '60%',
  lemon: '60%',
  spinach: '80%',
  kale: '70%',
  broccoli: '75%'
};

app.get('/api/moisture', (req: Request, res: Response) => {
  const { crop } = req.query;

  if (!crop) {
    return res.status(400).json({
      error: 'Crop name is required. Example: /api/moisture?crop=tomato'
    });
  }

  const normalizedCrop = (crop as string).toLowerCase();
  const moisture = CROP_MOISTURE[normalizedCrop];

  if (!moisture) {
    return res.status(404).json({
      error: `Crop '${crop}' not found in our database.`
    });
  }

  return res.status(200).json({
    crop: normalizedCrop,
    moisture: moisture
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Example: http://localhost:${port}/api/moisture?crop=tomato`);
});
