require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  brightData: {
    apiToken: process.env.BRIGHT_DATA_API_TOKEN || '',
    collectorId: process.env.BRIGHT_DATA_COLLECTOR_ID || 'c_msxjxlwm78wlkksy4',
    baseUrl: 'https://api.brightdata.com/dca'
  },
  ai: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || ''
  }
};
