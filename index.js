const title = document.querySelector('.book-name');
const cover = document.querySelector('.book-cover');

const fetchBooks = async (endpoint) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${endpoint}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.items[0].volumeInfo);

  title.innerText = data.items[0].volumeInfo.title;
  cover.src = data.items[0].volumeInfo.imageLinks.thumbnail;
};

fetchBooks('machado de assis');