import React, { useState } from 'react';

function FavoriteQuotes({ user, favorites, removeFromFav, setFavorites }) {
 const [editIndex, setEditIndex] = useState(null); // State to track the index of the quote being edited
 const [editedText, setEditedText] = useState(''); // State to track the edited text
 const [editedAuthor, setEditedAuthor] = useState(''); // State to track the edited author

//  const handleEdit = (index, text, author) => {
//   setEditIndex(index);
//   setEditedText(text);
//   setEditedAuthor(author);
//  };

const handleEdit = (e) => {
  const targetClassList = e.target.classList;
  const parentElement = e.target.closest('.fav-edit');
  const quoteElement = parentElement.querySelector('.quote');
  const authorElement = parentElement.querySelector('.author');
  
  // Check if the clicked element or any of its parents have the "editBtn" class
  const isEditBtnClicked = targetClassList.contains("editBtn") || e.target.closest('.editBtn');
  
  if (isEditBtnClicked) {
    quoteElement.setAttribute('contenteditable', true)
    authorElement.setAttribute('contenteditable', true)
    quoteElement.focus();
  }

  quoteElement.addEventListener("blur", handleBlur);
  authorElement.addEventListener("blur", handleBlur);
};

const handleBlur = (e) => {
  const relatedTarget = e.relatedTarget || document.activeElement;
  const parentElement = e.currentTarget.closest('.fav-edit');
  const quoteElement = parentElement.querySelector('.quote');
  const authorElement = parentElement.querySelector('.author');
  
  // Check if the related target is outside of the .fav-edit container
  if (!parentElement.contains(relatedTarget)) {
    quoteElement.removeAttribute('contenteditable');
    authorElement.removeAttribute('contenteditable');
  }
};


 const handleSaveEdit = (index) => {
  const updatedFavorites = [...favorites];
  updatedFavorites[index].quote = editedText;
  updatedFavorites[index].author = editedAuthor;
  setEditIndex(null);
  setFavorites(updatedFavorites);
 };

 function closeFav() {
  document.querySelector('.favourites').classList.remove('show');
 }
 return (
  <div className="favourites w100p">
   <div className="rel inner-wrapy clearfix glass container">
    <span onClick={closeFav} className="close-fav icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24px" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
    </span>
    <h2>Favorite Quotes</h2>
    <div className="favourites-wrapper">
     {favorites.length === 0 ? (
      <p>No favorite quotes yet.</p>
     ) : (
      favorites.map((quote, index) => (
       <div className='' key={index}>
        {editIndex === index ? ( 
         <div className='fav-edit'>
          <input type="text" className="form-input mr5" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          <input type="text" className="form-input mr5" value={editedAuthor} onChange={(e) => setEditedAuthor(e.target.value)} />
          <button className="form-submit" onClick={() => handleSaveEdit(index)}>
           Save
          </button>
         </div>
        ) : (
         <div className='fav-edit' onClick={(e)=>handleEdit(e)}>
          <p className='quote'> {quote.quote}</p>
          <p className='author'>— {quote.author}</p>
          <button className='editBtn'>
          {/* <button className='editBtn' onClick={() => handleEdit(index, quote.quote, quote.author)}> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

          </button>
          <button onClick={() => removeFromFav(quote)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
          </button>
          </div>
        )}
       </div>
      ))
     )}
    </div>
   </div>
  </div>
 );
}

export default FavoriteQuotes;
