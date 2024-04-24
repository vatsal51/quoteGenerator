function RandomQuote({ quoteData, addToFav }) {
  const handleAddToFav = () => {
    addToFav(quoteData);
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2000);
  };

  return (
    <div className="center">
      {quoteData.quote ? (
        <>
          <span id="toast">
            Added to favourite's
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 60 60"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM13.014 36.765c-1.343-1.357-1.343-3.543 0-4.9l1.766-1.756c.607-.612 1.436-.952 2.298-.943s1.683.368 2.276.994l3.12 3.237a1.59 1.59 0 0 0 2.311 0l15.9-16.39c.597-.63 1.426-.989 2.294-.994s1.701.344 2.306.967L47 18.714c1.308 1.35 1.308 3.496 0 4.846L25.891 45.011c-.595.616-1.413.966-2.27.972s-1.679-.334-2.282-.942z"
                fill="#699f4c"
                fillRule="evenodd"
              />
            </svg>
          </span>

          <span
            title="Add to favourite's"
            className="fav-logo"
            onClick={handleAddToFav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#E39673"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="25px"
              height="25px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </span>
          <div className="main-quote">
            <blockquote>
              <p>
                <span>“</span>
                {quoteData.quote}
              </p>
            </blockquote>
            <p>— {quoteData.author}</p>
          </div>
        </>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </div>
  );
}

export default RandomQuote;
