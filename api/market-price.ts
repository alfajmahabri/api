const CROP_PRICES: Record<string, number> = {
  tomato: 45,
  lettuce: 30,
  corn: 22,
  wheat: 21,
  rice: 35,
  soybean: 48,
  potato: 25,
  onion: 40,
  garlic: 120,
  carrot: 50,
  cucumber: 30,
  strawberry: 250,
  blueberry: 400,
  grape: 80,
  apple: 120,
  orange: 60,
  lemon: 150,
  spinach: 20,
  kale: 90,
  broccoli: 110
};

export default function handler(
  request: any,
  response: any
) {
  const { crop } = request.query;

  if (!crop) {
    return response.status(400).json({
      error: 'Crop name is required. Example: /api/market-price?crop=wheat'
    });
  }

  const normalizedCrop = (crop as string).toLowerCase();
  const basePrice = CROP_PRICES[normalizedCrop];

  if (basePrice === undefined) {
    return response.status(404).json({
      error: `Crop '${crop}' not found in our market database.`
    });
  }

  // LOGIC FOR RANDOM JUMPS EVERY 10 SECONDS
  const timeSeed = Math.floor(Date.now() / 10000);
  
  // Create a more "jittery" random value between -15 and +15
  // We use a combination of sine and floor to break the smooth wave pattern
  const jitter = (Math.sin(timeSeed * 12345.67) * 10000) % 15;
  const isNegative = Math.sin(timeSeed * 9876.54) > 0;
  
  const finalVariance = isNegative ? -Math.abs(jitter) : Math.abs(jitter);
  const currentPrice = (basePrice + finalVariance).toFixed(2);

  return response.status(200).json({
    status: "live_market_data",
    crop: normalizedCrop,
    base_price: `₹${basePrice.toFixed(2)}/kg`,
    current_market_price: `₹${currentPrice}/kg`,
    trend: finalVariance >= 0 ? "BULLISH (UP)" : "BEARISH (DOWN)",
    variance_amt: `${finalVariance >= 0 ? '+' : ''}${finalVariance.toFixed(2)}`,
    last_updated: new Date().toISOString(),
    api_node: "MANDI-NODE-SOUTH-01",
    update_interval: "10s Real-time Polling"
  });
}
