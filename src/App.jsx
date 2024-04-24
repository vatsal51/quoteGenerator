import { useState } from 'react';
import './App.css';
import axios from 'axios';
import rightArrow from"./assets/arrow-right.svg"
import RandomQuote from './components/RandomQuotes';
import Login from './components/Login';
import FavoriteQuotes from './components/FavoriteQuotes';
function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [user, setUser] = useState({});
 const [favorites, setFavorites] = useState([]);

 function handleFav() {

  document.querySelector('.favourites').classList.toggle('show');
 }

 const handleLogin = (userInfo) => {
  setUser(userInfo);
  setIsLoggedIn(true);
  fetchRandomQuote();
 };
console.log(user.name)
 const [quoteData, setQuoteData] = useState('');

 const fetchRandomQuote = () => {
  axios
   .get('https://api.api-ninjas.com/v1/quotes?X-Api-Key=vc/uJ88eDrcHC3bnaYu3Cg==uFbh3HKklh4Xwr9D&category=')
   .then((response) => {
    setQuoteData(response.data[0]);
   })
   .catch((error) => {
    console.error('Error fetching quote:', error);
   });
 };

 const removeFromFav = (quoteToRemove) => {
  setFavorites((prevFavorites) => prevFavorites.filter((quote) => quote.quote !== quoteToRemove.quote));
 };

 function addToFav(fav) {
  // Check if the quote already exists in favorites
  if (!favorites.some((quote) => quote.quote === fav.quote)) {
   setFavorites((prev) => [...prev, fav]);
  }
 }

 return (
  <div className="App">
   <div className="main-wrapper">
    {!isLoggedIn ? (
     <Login onLogin={handleLogin} />
    ) : (
     <div className="quote-card fadeIn w100p">
      <div className="rel inner-wrapy clearfix glass container">
        <p className='userName'>
        <span><svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</span> {user.name}</p>
       <RandomQuote user={user} quoteData={quoteData} addToFav={addToFav} />
       <div className="quote-footer">
        <span className="icon" onClick={handleFav}>
         <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
         </svg>
        </span>
        <span className="quote-generate" onClick={fetchRandomQuote}> <p className='quote-text'>More Quotes</p>
       <img className='rightArrow' src={rightArrow}/>
        </span>
       </div>
      </div>
     </div>
    )}
    <>
     <FavoriteQuotes user={user} favorites={favorites} setFavorites={setFavorites} removeFromFav={removeFromFav} />
    </>
   </div>
  </div>
 );
}

export default App;
