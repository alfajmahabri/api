# Crop Moisture API

A serverless API built with Node.js and TypeScript, designed to be hosted on Vercel. It returns the ideal soil moisture percentage for a variety of crops.

## Endpoint

`GET /api/moisture?crop=[name]`
or
`GET /moisture?crop=[name]`

### Example Request

`GET /api/moisture?crop=tomato`

### Example Response

```json
{
  "crop": "tomato",
  "moisture": "70%"
}
```

## Supported Crops

- Tomato, Lettuce, Corn, Wheat, Rice, Soybean, Potato, Onion, Garlic, Carrot, Cucumber, Strawberry, Blueberry, Grape, Apple, Orange, Lemon, Spinach, Kale, Broccoli.

## Development

1. Install dependencies: `npm install`
2. Run locally: `npm run dev`

## Deployment

Deploy to Vercel using the Vercel CLI or by connecting your GitHub repository.
