# Project 10 & 11: WTWR Project

### Overview

- Intro
- Figma
- Images

**Description of Project**

Project #10: This project builds a webpage that suggests items to wear based on the current weather conditions in a location. The header includes the current date and location, as well as an "Add clothes" form and user name. A weather card indicates the current temperature in fahrenheit for the location, as well as an image the reflects the time of day (day or night) and weather conditions. Depending on whether the temperature is "hot", "warm", or "cold", the clothing cards are filtered to reflect only those to be worn based on the temperature.

Project #11: A profile page with a sidebar with user information has been added using Routes. Additionally, the "Add Item" form allows users to add item and delete items in a local server. A confirmation modal has been added to confirm deletion of the items. A toggle switch allows users to switch between Fahrenheit and Celsius.

**Description of Techniques**

Project #10: In this project, React + Vite were utilized to create an interactive webpage. The date is updated from the Date() method while the location is currently hardcoded with longitude and latitude coordinates.
The OpenWeather API is used to fetch the current weather conditions based on the coordinates. The current temperature was classified into "hot", "warm" and "cold" so this type of temperature could be used to filter the clothing item cards that matched. The weather condition and sunrise/sunset times from the API were used to determine if it was day or night and then matched to an array of images that are displayed on the weathercard to reflect current weather conditions.

Project #11: A currentTemperature context allows use of a toggle switch to pass the temperature information as F or C. An api that can fetch data from a local server and a db.json file has been added. Items can be added and deleted from the database.

**Figma**

- [Link to the project on Figma] (https://www.figma.com/file/F03bTb81Pw8IDPj5Y9rc5i/Sprint-10-%7C-WTWR)

**Images**
./src/assets/images/DesktopDaytime.png
./src/assets/images/DesktopNighttime.png
./src/assets/images/Desktop AddItem Form.png
./src/assets/images/Desktop DeleteConfirmation.png
./src/assets/images/Desktop Sidebar.png
./src/assets/images/Desktop ToggleSwitch.png

**Github Pages URL**
https://github.com/katiejacobson/se_project_react.git

**To Improve**

I would like to add in the ability to change the location and the coordinates can be populated into the API so the web app can be used for any location.

I will add responsive design for a mobile version.
