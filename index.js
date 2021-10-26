const title = document.querySelector('.book-name');
const cover = document.querySelector('.book-cover');
const input = document.querySelector('.input');
const author = document.querySelector('.book-author');
const description = document.querySelector('.book-desc');
const searchButton = document.querySelector('#btn-generate');

const generateRandomNumber = (length) => Math.floor(Math.random()*length);

const generateCover = (imageLinks) => {
  if (!imageLinks) {
    return img = 'imgs/nocover.jpg'
  }
  return imageLinks.thumbnail;
}
const createLoadscreen = () => {
  title.innerText = 'Loading...';
  searchButton.classList.add('is-loading');
  cover.style.display = 'none';
}

const getRealeseYear = (date) => {
  const splitedDate = date.split('-');
  return splitedDate[0];
}

const fetchBooks = async (endpoint) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${endpoint}&maxResults=40`;
  const response = await fetch(url);
  const data = await response.json();
  const randomNumber = generateRandomNumber(data.items.length);
  const thumbnail = generateCover(data.items[randomNumber].volumeInfo.imageLinks);
  const book = data.items[randomNumber].volumeInfo.title;
  const year = getRealeseYear(data.items[randomNumber].volumeInfo.publishedDate);

  title.innerText = `${book} (${year})`;
  author.innerText = data.items[randomNumber].volumeInfo.authors;
  description.innerText = data.items[randomNumber].volumeInfo.description;
  cover.style.display = 'block';
  cover.src = thumbnail;

  searchButton.classList.remove('is-loading');
};

window.onload = () => {
  input.value = '';
  createLoadscreen();
  fetchBooks('albert camus');
}
