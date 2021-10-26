const title = document.querySelector('.book-name');
const cover = document.querySelector('.book-cover');

const generateRandomNumber = (length) => Math.floor(Math.random()*length);

const fetchBooks = async (endpoint) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${endpoint}&maxResults=40`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.items.length);
  const randomNumber = generateRandomNumber(data.items.length);

  title.innerText = data.items[randomNumber].volumeInfo.title;
  cover.src = data.items[randomNumber].volumeInfo.imageLinks.thumbnail;
};

window.onload = () => {
  fetchBooks('machado de assis');
}
