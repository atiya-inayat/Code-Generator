const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//  Show Loading
function showLoadingSpinner() {
  // means che kala loader active e nu baki harsa ba hode ye and vise versa
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  showLoadingSpinner();
  // pick random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote);
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 50) {
    quoteText.classList.add("long-text");
  } else {
    quoteText.classList.remove("long-text");
  }

  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}
// step 1
// getting url
async function getQuotes() {
  showLoadingSpinner();

  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
    newQuote();
  } catch (error) {
    // catch error
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
