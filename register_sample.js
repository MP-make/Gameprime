// const fetch = require('node-fetch'); // Not needed in Node 18+

async function registerUser(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log(`Registered ${email}:`, data);
  } catch (error) {
    console.error(`Error registering ${email}:`, error);
  }
}

// Register admin
registerUser('admin@gameprime.com', 'admin123');

// Register client
registerUser('cliente@gameprime.com', 'cliente123');