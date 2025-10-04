import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3003';

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');
    
    // Test 1: Basic endpoint
    console.log('1. Testing basic endpoint...');
    const basicResponse = await fetch(`${BASE_URL}/`);
    const basicData = await basicResponse.text();
    console.log('Status:', basicResponse.status);
    console.log('Response:', basicData);
    console.log('');
    
    // Test 2: Check email endpoint
    console.log('2. Testing check-email endpoint...');
    const emailResponse = await fetch(`${BASE_URL}/auth/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });
    const emailData = await emailResponse.text();
    console.log('Status:', emailResponse.status);
    console.log('Response:', emailData);
    console.log('');
    
    // Test 3: Send OTP endpoint
    console.log('3. Testing send-otp endpoint...');
    const otpResponse = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        otp_type: 'email'
      })
    });
    const otpData = await otpResponse.text();
    console.log('Status:', otpResponse.status);
    console.log('Response:', otpData);
    console.log('');
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testAPI();
