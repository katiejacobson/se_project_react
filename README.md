# Project 10 & 11: WTWR Project

### Overview

- Intro
- Figma
- Images

**Description of Project**

Project #10: This project builds a webpage that suggests items to wear based on the current weather conditions in a location. The header includes the current date and location, as well as an "Add clothes" form and user name. A weather card indicates the current temperature in fahrenheit for the location, as well as an image the reflects the time of day (day or night) and weather conditions. Depending on whether the temperature is "hot", "warm", or "cold", the clothing cards are filtered to reflect only those to be worn based on the temperature.

Project #11: A profile page with a sidebar with user information has been added using Routes. Additionally, the "Add Item" form allows users to add item and delete items in a local server. A confirmation modal has been added to confirm deletion of the items. A toggle switch allows users to switch between Fahrenheit and Celsius.

Project #14: Frontend Authentication has been added so that a user can register and then login to access personally added items. Registered users can add items for hot, warm, and cold weather, all of which are displayed on their profile page, which only they can delete from the database. Registered users can also like any items on the database. Users also have the ability to edit the name and avatar image in the database.

Link to backend repo: https://github.com/katiejacobson/se_project_express.git

**Description of Techniques**

Project #10: In this project, React + Vite were utilized to create an interactive webpage. The date is updated from the Date() method while the location is currently hardcoded with longitude and latitude coordinates.
The OpenWeather API is used to fetch the current weather conditions based on the coordinates. The current temperature was classified into "hot", "warm" and "cold" so this type of temperature could be used to filter the clothing item cards that matched. The weather condition and sunrise/sunset times from the API were used to determine if it was day or night and then matched to an array of images that are displayed on the weathercard to reflect current weather conditions.

Project #11: A currentTemperature context allows use of a toggle switch to pass the temperature information as F or C. An api that can fetch data from a local server and a db.json file has been added. Items can be added and deleted from the database.

Project #14: A currentUser context has been added so that once authorization has occurred, users can access items that they have added. An api that can fetch data from a local server that is running an Express server that was created by me has been added. Users can register, sign-in, add items, delete their own items, like and dislike cards, and change their profile information.

**Figma**

- [Link to the project on Figma] (https://www.figma.com/file/F03bTb81Pw8IDPj5Y9rc5i/Sprint-10-%7C-WTWR)

**Images**
./src/assets/images/DesktopDaytime.png
./src/assets/images/DesktopNighttime.png
./src/assets/images/Desktop AddItem Form.png
./src/assets/images/Desktop DeleteConfirmation.png
./src/assets/images/Desktop Sidebar.png
./src/assets/images/Desktop ToggleSwitch.png
./src/assets/images/Desktop ChangeProfileModal.png
./src/assets/images/Desktop LoggedIn LandingPage.png
./src/assets/images/Desktop LoggedInProfilePage.png
./src/assets/images/Desktop LoginModal.png
./src/assets/images/Desktop NonUserItem NoDeleteButton.png
./src/assets/images/Desktop UpdatedLandingPage.png
./src/assets/images/Desktop UserItem DeleteButton.png

**Github Pages URL**
https://github.com/katiejacobson/se_project_react.git

**To Improve**

I would like to add in the ability to change the location and the coordinates can be populated into the API so the web app can be used for any location.

I would like to add responsive design for a mobile version.

I would add error messages if a login fails due to incorrect password or unknown user.
