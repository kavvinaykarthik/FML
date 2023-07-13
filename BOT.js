const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');


const bot = new TelegramBot('6282241433:AAFFE504gwUmO7aXzsvfe4rfmJqTmbaPAEw', { polling: true });

// Replace 'YOUR_API_KEY' with your actual API key obtained from OpenWeatherMap
const API_KEY = 'b1de64a4f8531035273edb94f36b7597';



bot.onText(/\/weather (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const place = match[1];
  
    // Make a request to the OpenWeatherMap API
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=ea05f0b6617d998492f421c4335d3bba`', {
      params: {
        q: place,
        appid: API_KEY,
        units: 'metric',
      },
    })
    .then((response) => {
      const weatherData = response.data;
      const weatherDescription = weatherData.weather[0].description;
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
  
      const message = `Weather in ${place}:\n\nDescription: ${weatherDescription}\nTemperature: ${temperature}°C\nHumidity: ${humidity}%\nWind Speed: ${windSpeed} m/s`;
  
      bot.sendMessage(chatId, message);
    })
    .catch((error) => {
      console.error('Weather API Error:', error);
      bot.sendMessage(chatId, 'An error occurred while fetching the weather information.');
    });
  });