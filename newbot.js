const TelegramBot = require("node-telegram-bot-api");
const axios = require('axios');
const express = require('express');
const a = express();
a.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
a.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const telegramToken = "6282241433:AAFFE504gwUmO7aXzsvfe4rfmJqTmbaPAEw";

const bot = new TelegramBot(telegramToken, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=ea05f0b6617d998492f421c4335d3bba`
    );
    const weatherData = weatherResponse.data;
    const weatherDescription = weatherData.weather[0].description;
    const temperature = weatherData.main.temp - 273.15;
    const city = weatherData.name;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const windSpeed = weatherData.wind.speed;
    const message = `In ${city}, the weather is ${weatherDescription} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, "Sorry, couldn't find information for the specified city.");
  }
});
