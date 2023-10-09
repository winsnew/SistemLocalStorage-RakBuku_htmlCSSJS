document.addEventListener('DOMContentLoaded', function () {
    loadBooks();

    const isCheckbox = document.getElementById('isComplete');
    isCheckbox.addEventListener('change', function () {
        updateRakBuku();
    })
})

function addBook() {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const year = document.getElementById('year').value
    const isComplete = document.getElementById('isComplete').checked

    const book = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    }

    const books = getBooks();
    books.push(book);
    saveBooks(books);
    clearForm();
    updateRakBuku();
}

function updateRakBuku() {
    const unFinishBooks = document.getElementById('list-belumDibaca');
    const finishBooks = document.getElementById('list-terbaca');

    unFinishBooks.innerHTML = '';
    finishBooks.innerHTML = '';

    const books = getBooks();
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} - ${book.author} (${book.year}) <button onclick="removeBook(${book.id})">Hapus</button>`;
        
        if(book.isComplete) {
            finishBooks.appendChild(li);
        } else {
            li.innerHTML += `<button onclick="pindahBuku(${book.id})">Selesai</button>`;
            unFinishBooks.appendChild(li);
        }
         
    });
}


function pindahBuku(bookId){
    const books = getBooks();
    const index = books.findIndex(book => book.id === bookId);
    if(index !== -1) {
        books[index].isComplete = true;
        saveBooks(books);
        updateRakBuku();
    }
}

function removeBook(bookId) {
    const books = getBooks();
    const index = books.findIndex(book => book.id === bookId)
    if(index !== -1) {
        books.splice(index, 1);
        saveBooks(books)
        updateRakBuku();
    }
}

function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function getBooks() {
    const storeBooks = localStorage.getItem('books')
    return storeBooks ? JSON.parse(storeBooks) : [];
}

function loadBooks() {
    updateRakBuku();
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = ''
    document.getElementById('isComplete').checked = false
}