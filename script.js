const mongoose = require('mongoose');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));


// Define the MongoDB Schema
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  sentiment: String,
}));

// Fetch Data from MongoDB
const getUsersData = async () => {
  return await User.find();
};


// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Analyze Data using OpenAI
const analyzeDataWithOpenAI = async (data) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'system', content: 'Analyze campus data for safety trends'}, {role: 'user', content: JSON.stringify(data)}],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error with OpenAI:', error);
  }
};


// Main Function
const main = async () => {
  const usersData = await getUsersData();  // Fetch data from MongoDB
  const analysis = await analyzeDataWithOpenAI(usersData);  // Analyze with OpenAI
  console.log('AI Analysis:', analysis);  // Output result to command line
};

// Run the script
main();
