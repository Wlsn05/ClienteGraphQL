window.addEventListener("load", () => {
  getAuthors();
});

const endpoint = "https://apolloserver-ftdy.onrender.com/graphql";

function getAuthors() {
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
            authors {
              authorId
              name
              country
            }
        }`
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderList(data.data.authors);
    })
    .catch((error) => {
      console.error('Error fetching authors:', error)
    });
}

function getAuthor(authorId) {
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
            findByAuthorId(authorId: ${authorId}) {
              books {
                title
              }
            }
          }`
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
}

function renderList(authors) {
  const list = document.querySelector('#authors-list');
  authors.forEach((author) => {
    createListElement(list, author);
  });
}

function createListElement(list, author) {
  const item = document.createElement("li")
  item.classList.add("cursor-pointer")
  item.addEventListener("click", () => getAuthor(author.authorId))
  item.innerText = author.name
  list.appendChild(item);
}

