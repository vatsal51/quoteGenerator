import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import rightArrow from "./assets/arrow-right.svg";
import leftArrow from "./assets/arrow-left.svg";
import RandomQuote from "./components/RandomQuotes";
import Login from "./components/Login";
import FavoriteQuotes from "./components/FavoriteQuotes";
import Category from "./components/Category.jsx";
import categoryList from "./category.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [quoteData, setQuoteData] = useState("");

  const [category, setCategory] = useState("");
  function updateCategory(cat) {
    setCategory(cat);
    setQuoteData("");
  }

  function handleFav() {
    document.querySelector(".favourites").classList.toggle("show");
  }

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setIsLoggedIn(true);
    // fetchRandomQuote();
  };

  useEffect(() => {
    if (category.length > 0) {
      fetchRandomQuote();
    }
  }, [category]);
  const fetchRandomQuote = () => {
    axios
      .get(
        `https://api.api-ninjas.com/v1/quotes?X-Api-Key=vc/uJ88eDrcHC3bnaYu3Cg==uFbh3HKklh4Xwr9D&category=${category}`
      )
      .then((response) => {
        setQuoteData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });
  };

  const removeFromFav = (quoteToRemove) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((quote) => quote.quote !== quoteToRemove.quote)
    );
  };

  function addToFav(fav) {
    if (!favorites.some((quote) => quote.quote === fav.quote)) {
      setFavorites((prev) => [...prev, fav]);
    }
  }
  function handleBack() {
    setCategory("");
    setQuoteData("");
  }

  return (
    <div className="App">
      <div className="main-wrapper">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : !category ? (
          <div className="quote-card fadeIn w100p">
            <div className="rel inner-wrapy clearfix glass container">
              <Category
                categoryList={categoryList}
                updateCategory={updateCategory}
              />
            </div>
          </div>
        ) : (
          <div className="quote-card fadeIn w100p">
            <div className="rel inner-wrapy clearfix glass container">
              <div className="quote-header">
                <span
                  className="icon back"
                  title="back to category"
                  onClick={handleBack}
                >
                  <img src={leftArrow} />
                </span>
                <span title="user logged in" className="userName">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </span>
                  {user.name}
                </span>
              </div>
              <RandomQuote quoteData={quoteData} addToFav={addToFav} />
              <div className="quote-footer">
                <span
                  className="icon"
                  title="open favourite's"
                  onClick={handleFav}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:v="https://vecta.io/nano"
                    width="30px"
                    height="30px"
                    viewBox="0 0 90 100"
                  >
                    <path d="M79 24a5 5 0 0 0-9.62-1.91 1.49 1.49 0 0 1-2.75 0A5 5 0 0 0 57 24c0 2.82 3.39 7.32 9.3 12.34a2.62 2.62 0 0 0 3.4 0C75.61 31.32 79 26.82 79 24zM67 74.9V50a3 3 0 0 0-3.3-3 3.12 3.12 0 0 0-2.7 3.17v24.59L49.54 63.29a7.83 7.83 0 0 0-11.07 0L27 74.76V28a3 3 0 0 1 3-3h12.83A3.12 3.12 0 0 0 46 22.3a3 3 0 0 0-3-3.3H30a9 9 0 0 0-9 9v46.9a6 6 0 0 0 5.7 6.1 5.82 5.82 0 0 0 4.3-1.71l13-13 13 13.05A5.76 5.76 0 0 0 61.3 81a6 6 0 0 0 5.7-6.1z" />
                  </svg>
                </span>
                <span
                  className="quote-generate"
                  title="Generate new quote's"
                  onClick={fetchRandomQuote}
                >
                  <p className="quote-text">More Quotes</p>
                  <img className="rightArrow" src={rightArrow} />
                </span>
              </div>
            </div>
          </div>
        )}

        <>
          <FavoriteQuotes
            favorites={favorites}
            setFavorites={setFavorites}
            removeFromFav={removeFromFav}
          />
        </>
      </div>
    </div>
  );
}

export default App;
