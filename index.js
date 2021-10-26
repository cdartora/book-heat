const title = document.querySelector('.book-name');
const cover = document.querySelector('.book-cover');

const fetchBooks = async (endpoint) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${endpoint}+subject`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.items);

  title.innerText = data.items[1].volumeInfo.title;
  cover.src = data.items[1].volumeInfo.imageLinks.thumbnail;
};

fetchBooks('horror');