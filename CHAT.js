const TBot = require("node-telegram-bot-api");
const axiosLib = require('axios');
const expressApp = require('express');
const a = expressApp();
a.get('/', (req, res) => {
  res.send('Hello World!');
});

const serverPort = 3000;
a.listen(serverPort, () => {
  console.log(`Currently Server running at http://localhost:${serverPort}`);
});

const tToken = "6282241433:AAFFE504gwUmO7aXzsvfe4rfmJqTmbaPAEw";

const bot = new TBot(tToken, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  try {
    const weatherResp = await axiosLib.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=ea05f0b6617d998492f421c4335d3bba`
    );
    const weatherData = weatherResp.data;
    const weatherDesc = weatherData.weather[0].description;
    const temperature = weatherData.main.temp - 273.15;
    const city = weatherData.name;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const windSpeed = weatherData.wind.speed;
    const message = `In ${city}, the weather is ${weatherDesc} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, "Sorry, couldn't find information for the specified city.");
  }
});
