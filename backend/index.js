const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

let books = [
    {id : 1, title: "Atomic Habits" , author : "James Clear", year : 2018},
    {id: 2, title: "The Alchemist" , author: "Paulo Coelho" ,year: 1988}
];


// Get all BOOks:

app.get("/books" , (req,res)=>{
    res.json(books);
});


//get

app.get("/books/:id" , (req,res)=>{
    const book = books.find(b=> b.id == req.params.id);
    if(!book){
        return res.status(404).send({error : "Book not found"});
    }

    res.json(book);
})


//post a newbook

app.post("/books" ,(req,res)=>{
    const {title , author ,year} = req.body;
    
    const newBook = {
        id : books.length+1,
        title,
        author,
        year
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// put replace a book

app.put("/books/:id" , (req,res)=>{
    const index = books.findIndex(b=> b.id == req.params.id);
    if(index===-1)return res.status(404).send({error : "BOOK Not Found"});

    const { title , author ,year} = req.body;
    books[index] = { id : parseInt(req.params.id), title , author , year};
    res.json(books[index]);
});


// patch => for partial update
app.patch("/books/:id" , (req,res)=>{
    const book = books.find(b=>b.id == req.params.id);
    if(!book) return res.status(404).send({error : "Book not found"});

    const { title,author , year} = req.body;

    if(title){
        book.title = title;
    }
    if(author){
        book.author = author;
    }
    if(year){
        book.year = year;
    }

    res.json(book);
});



// delete


app.delete("/books/:id" , (req,res)=>{
    books = books.filter(b=>b.id != req.params.id);
    res.send({message : "Book deleted!"});
})


const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`);
})






