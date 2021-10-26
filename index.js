const title = document.querySelector('.book-name');
const cover = document.querySelector('.book-cover');
const input = document.querySelector('.input');
const genreButton = document.querySelector('#btn-genre');
const authorButton = document.querySelector('#btn-author');
const randomizeButton = document.querySelector('#btn-generate');

const generateRandomNumber = (length) => Math.floor(Math.random()*length);

const generateCover = (imageLinks) => {
  if (!imageLinks) {
    return img = 'imgs/nocover.jpg'
  }
  return imageLinks.thumbnail;
}

const createLoadscreen = () => {
  title.innerText = 'Loading...';
}

const genreButtonEvent = () => {
  input.placeholder = 'Search by Genre';
  input.classList.add('byGenre');
  input.classList.remove('byAuthor');
}

const authorButtonEvent = () => {
  input.placeholder = 'Search by Author';
  input.classList.add('byAuthor');
  input.classList.remove('byGenre');
}

const searchByGenre = (searchInput) => `subject:${searchInput}`;

const searchByAuthor = (searchInput) => `inauthor:${searchInput}`;

const fetchBooks = async (endpoint) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${endpoint}&maxResults=40`;
  const response = await fetch(url);
  const data = await response.json();
  const randomNumber = generateRandomNumber(data.items.length);
  const thumbnail = generateCover(data.items[randomNumber].volumeInfo.imageLinks);

  title.innerText = data.items[randomNumber].volumeInfo.title;
  cover.src = thumbnail;
};

const searchButtonEvent = () => {
  const searchBar = input.classList.value;
  if (searchBar.includes('byGenre')) {
    createLoadscreen();
    fetchBooks(searchByGenre(input.value));
  } else if (searchBar.includes('byAuthor')) {
    createLoadscreen();
    fetchBooks(searchByAuthor(input.value));
  }
}

window.onload = () => {
  genreButton.addEventListener('click', genreButtonEvent);
  authorButton.addEventListener('click', authorButtonEvent);
  randomizeButton.addEventListener('click', searchButtonEvent);
}
