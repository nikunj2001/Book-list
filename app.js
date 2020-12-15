// BOOK CLASS
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}


// UI CLASS :UI TASK
class UI{
    static displayBooks(){
       
        const books = Store.getBooks();

        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
            const list=document.querySelector('#book-list');
            const row=document.createElement('tr');
            row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
            `;
            list.appendChild(row);
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
    static clearFields(){
        document.querySelector("#title").value='';
        document.querySelector("#author").value='';
        document.querySelector("#isbn").value='';
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}



// STORE CLASS
class Store{
   static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
        books=[];
    }else{
        books=JSON.parse(localStorage.getItem('books'));
    }
    return books;
    
    }
   static addBooks(book){
    const books=store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}



// EVENT:DISPLAY BOOKS
document.addEventListener("DOMContentLoaded",UI.displayBooks);



// EVENT:ADD A BOOK
document.querySelector("#book-form").addEventListener('submit',(e)=>{
    // Get form Values
    e.preventDefault();
    const title= document.querySelector('#title').value;
    const author= document.querySelector('#author').value;
    const isbn= document.querySelector('#isbn').value;

    // validate 
    if(title==='' || author==='' || isbn===''){
        UI.showAlert("Plese Fill in all Fields",'danger');
    }else{
         // INSTANSIATE BOOKS
    const book=new Book(title,author,isbn);

    // ADD BOOK TO UI
    UI.addBookToList(book);
    // add book to srt
    // Success message
    UI.showAlert("book Added",'success')
    // CLEAR FIelds
    UI.clearFields();
    }
    });
   


// EVENT:REMOVE A BOOK

document.querySelector("#book-list").addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
    // Success message
    UI.showAlert("book Removed",'success')
})