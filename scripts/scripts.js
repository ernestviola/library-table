const library = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error(`You must use the 'new' operator to call the constructor`);
  }

  if (title == null && title == undefined || typeof title !== 'string') {
    throw Error('Invalid title');
  }
  if (author == null && author == undefined || typeof author !== 'string') {
    throw Error('Invalid author');
  }
  if (pages == null && pages == undefined || typeof pages !== 'number') {
    throw Error('Invalid pages');
  }
  if (read == null && read == undefined || typeof read !== 'boolean') {
    throw Error('Invalid read');
  }
  this.uuid = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addBookToLibrary = (title, author, pages, read) => {
  const book = new Book(title, author, pages, read);
  library.push(book);

  // add book to table
  addBookToRow(book);
}

const addBookToRow = (book) => {
  const books = document.getElementById('books');
  const newRow = document.createElement('tr');
  let uuid = ''
  for (key in book) {
    if (key == 'uuid') {
      uuid = book[key];
      newRow.setAttribute('data-uuid',uuid);
    } else {
      let child = document.createElement('td');
      child.innerHTML = book[key];
      newRow.appendChild(child);
    }
  }
  const removeButtonData = document.createElement('td');
  const removeButton = document.createElement('button');
  const trashImg = document.createElement('img');
  removeButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeBookFromLibrary(e.currentTarget.getAttribute('data-uuid'));

  })
  trashImg.src = '/images/trash.svg';
  removeButtonData.className = 'book__remove__td';
  removeButton.className = 'book__remove';
  removeButton.setAttribute('data-uuid',uuid);
  removeButton.appendChild(trashImg);
  removeButtonData.appendChild(removeButton);
  newRow.appendChild(removeButtonData);
  books.appendChild(newRow);
}

const removeBookFromLibrary = (uuid) => {
  const index = library.findIndex( book => book.uuid = uuid);
  library.splice(index,1);
  const tableRow = document.querySelector(`[data-uuid="${uuid}"]`);
  tableRow.remove();

}

const booksToAdd = [
  {
    title: 'The Hobbit',
    author: 'J.R.R Tolkien',
    pages: 295,
    read: false
  },
  {
    title: 'Martyr!',
    author: 'Kaveh Akbar',
    pages: 352,
    read: true
  },
  {
    title: 'The Hitchhikers Guide to The Galaxy',
    author: 'Douglas Adams',
    pages: 200,
    read: true
  },
  {
    title: 'Tuesdays with Morrie',
    author: 'Mitch Albom',
    pages: 192,
    read: true
  }
]

for (let i = 0; i < booksToAdd.length; i++) {
  let book = booksToAdd[i]
  addBookToLibrary(
    book.title,
    book.author,
    book.pages,
    book.read
  );
}