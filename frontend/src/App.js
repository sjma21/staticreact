import React , {useEffect , useState} from "react";
import api from "./api";

function App(){
  const [books , setBooks] = useState([]);
  const [form , setForm] =useState({title: "", author : "" , year: ""});

  useEffect(()=>{
    fetchBooks();
  }, []);


  const fetchBooks= async ()=>{
    const res = await api.get("/books");
    setBooks(res.data);
  };


  const handleChange = (e) =>{
    setForm({...form , [e.target.name] : e.target.value});
  };


  const handleSubmit = async (e) =>{
    e.preventDefault();
    await api.post("/books" , form);
    setForm({title : "",author:"" , year : ""});
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/books/${id}`);
    fetchBooks();
  };


  return (
    <div style={{ padding: '2rem' }}>
      <h2>📚 Book Manager</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <button type="submit">Add Book</button>
      </form>

      <hr />

      <h3>All Books</h3>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.year})
            <button onClick={() => handleDelete(book.id)} style={{ marginLeft: '1rem' }}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default App;