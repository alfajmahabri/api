async function runTests() {
  const baseUrl = 'http://localhost:3000/api/moisture';
  
  console.log('🚀 Starting API tests...\n');

  const tests = [
    {
      name: '✅ Get moisture for tomato',
      url: `${baseUrl}?crop=tomato`,
      expectedStatus: 200,
      expectedData: { crop: 'tomato', moisture: '70%' }
    },
    {
      name: '✅ Get moisture for rice (case insensitive)',
      url: `${baseUrl}?crop=RICE`,
      expectedStatus: 200,
      expectedData: { crop: 'rice', moisture: '90%' }
    },
    {
      name: '❌ Error when crop is missing',
      url: baseUrl,
      expectedStatus: 400,
      expectedError: 'Crop name is required.'
    },
    {
      name: '❌ Error when crop does not exist',
      url: `${baseUrl}?crop=unknown_crop`,
      expectedStatus: 404,
      expectedError: "Crop 'unknown_crop' not found"
    }
  ];

  for (const t of tests) {
    try {
      const res = await fetch(t.url);
      const data = await res.json();

      if (res.status === t.expectedStatus) {
        console.log(`${t.name} - PASSED`);
      } else {
        console.log(`${t.name} - FAILED (Status: ${res.status}, Expected: ${t.expectedStatus})`);
      }
    } catch (err) {
      console.log(`${t.name} - FAILED (Error: ${err.message})`);
    }
  }
}

runTests();
