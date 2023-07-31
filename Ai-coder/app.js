// Import the Axios library to make requests to the OpenAI API
const axios = require('axios');
// Load the OpenAI API key from a file named ".env"
require('dotenv').config();
// Store the OpenAI API key in a variable for later use
const apiKey = process.env.OPENAI_API_KEY;

// Create a new "client" to interact with the OpenAI API
// and include the API key in the request headers for authentication
const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}` // Use the API key to authenticate the request
  }
});

// Define the text prompt and the desired length and randomness of the generated text
const data = {
  // The starting sentence for the generated text
  prompt: 'Once upon a time',
  // The maximum length of the generated text in words or punctuation marks 
  max_tokens: 10, 
  // The degree of randomness in the generated text (higher values mean more random output)
  temperature: 0.5 
};

// Send a request to the OpenAI API to generate text based on the provided data
client.post('https://api.openai.com/v1/engines/davinci/completions', data)
  // If the request is successful, print the generated text to the console
  .then(response => {
    console.log(response.data.choices[0].text);
  })
  // If there is an error with the request, print the error message to the console
  .catch(error => {
    console.error(error);
  });
