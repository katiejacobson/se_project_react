import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import * as auth from "../../utils/auth.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { getWeather, processWeatherData } from "../../utils/weatherApi.js";
import {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import {
  coordinates,
  hawaiiCoordinates,
  manilaCoordinates,
  icelandCoordinates,
  APIkey,
} from "../../utils/constants.js";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    city: "",
    temperature: { F: "", C: "" },
    day: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    avatarUrl: "",
    _id: "",
  });

  const handleToggleSwitchChange = (e) => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const setTemperatureDisplay = (currentTemperatureUnit) => {
    if (currentTemperatureUnit === "F") {
      return weatherData.temperature.F + " ºF";
    } else {
      return weatherData.temperature.C + " ºC";
    }
  };

  const handleCardClick = (item) => {
    setActiveModal("preview");
    setSelectedCard(item);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openConfirmationModal = () => {
    setActiveModal("delete-item");
  };

  const handleAddItemSubmit = (e, values) => {
    addItems(values)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    deleteItems(id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegistration = ({ email, password, username, avatarUrl }) => {
    auth
      .register(email, password, username, avatarUrl)
      .then(() => navigate("/signin"))
      .catch(console.error);
  };

  const handleLogIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          closeActiveModal();
          setIsLoggedIn(true);
        }
      })
      .catch(console.error);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfile = ({ name, avatar }) => {
    const jwt = localStorage.getItem("jwt");
    console.log("inside handleEditProfile");
    if (!jwt) {
      return;
    }

    auth
      .editUserInfo(name, avatar, jwt)
      .then(() => {
        setCurrentUser({
          username: name,
          avatarUrl: avatar,
        });
      })
      .then(() => {
        closeActiveModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({
      username: "",
      avatarUrl: "",
      _id: "",
    });
    navigate("/");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    auth
      .getUserInfo(jwt)
      .then(({ name, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({
          username: name,
          avatarUrl: avatar,
          _id: _id,
        });
        navigate("/");
      })
      .catch(console.error);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleModalClose = (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
      if (evt.target.classList.contains("modal__close-button")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleModalClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleModalClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => {
        const currentWeather = processWeatherData(res);
        setWeatherData(currentWeather);
      })
      .catch(console.error);
    getItems()
      .then((res) => {
        setClothingItems(res);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    setTemperatureDisplay={setTemperatureDisplay}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      currentUser={currentUser}
                      handleCloseClick={closeActiveModal}
                      closeActiveModal={closeActiveModal}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogOut={handleLogOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <RegisterModal
                    activeModal="register"
                    handleCloseClick={closeActiveModal}
                    handleRegistration={handleRegistration}
                    closeActiveModal={closeActiveModal}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <LoginModal
                    activeModal="login"
                    handleCloseClick={closeActiveModal}
                    closeActiveModal={closeActiveModal}
                    handleLogIn={handleLogIn}
                  />
                }
              />
            </Routes>
            <Footer />
            <AddItemModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              onAddItem={handleAddItemSubmit}
              closeActiveModal={closeActiveModal}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              name={"preview"}
              handleDeleteItem={handleDeleteItem}
              openConfirmationModal={openConfirmationModal}
              closeActiveModal={closeActiveModal}
            />
            <EditProfileModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              handleEditProfile={handleEditProfile}
              closeActiveModal={closeActiveModal}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
