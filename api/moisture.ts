import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export default function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { crop } = request.query;

  if (!crop) {
    return response.status(400).json({
      error: 'Crop name is required. Example: /api/moisture?crop=tomato'
    });
  }

  const normalizedCrop = (crop as string).toLowerCase();
  const moisture = CROP_MOISTURE[normalizedCrop];

  if (!moisture) {
    return response.status(404).json({
      error: `Crop '${crop}' not found in our database.`
    });
  }

  return response.status(200).json({
    crop: normalizedCrop,
    moisture: moisture
  });
}
