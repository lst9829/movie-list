import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const[movies, setMovies] = useState([{
    id: 0,
    title: ''
  }])
  const[search, setSearch] = useState("");
  const[results, setResults] = useState();
  const[clicked, setClicked] = useState(false);
  const[newMovie, setNewMovie] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/movies')
    .then(res => res.json())
    .then(data => data.filter(id => id.id > 5))
    .then(filteredData => setMovies(filteredData))
  }, [movies])

  const handleSearch = () => {
    setClicked(true)
    const searchMovie = movies.filter(title => {
      return title.title.toLowerCase().match(search.toLowerCase())
    })
    setResults(searchMovie)
    setSearch("");
  }

  const handleAdd = () => {
    let jsonData = {
      "title": newMovie
    }
    fetch('http://localhost:8000/movies', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(jsonData)
    })
    setNewMovie("");
  }

  const handleDelete = (value) => {
    const filteredMovies = movies.filter(title => title.title !== value)
    setMovies(filteredMovies)
    const jsonData = {
      "title": value
    }
    fetch('http://localhost:8000/movies', {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(jsonData)
    })
  }
  return (
    <div className="App">
      {clicked === false ?
      <>
        <input type="search" value={search} placeholder="search for movie" onChange={(event) => setSearch(event.target.value)}></input>
        <button type="submit" onClick={() => handleSearch()}>Search</button>
        <input type="text" value={newMovie} placeholder="add new movie" onChange={(event) => setNewMovie(event.target.value)}></input>
        <button type="submit" onClick={() => handleAdd()}>Add New Movie</button>
        {movies.map(movie => (
          <div key={movie.id}>
            <div>{movie.title}</div>
            <button type='submit' onClick={() => handleDelete(movie.title)}>Delete</button>
          </div>
        ))}
      </> :
      <div>
          <>
            <button type='submit' onClick={() => setClicked(false)}>Go Home</button>
            {results.map(movie => (
              <>
                <div>{movie.title}</div>
              </>
            ))}
          </>
      </div>
      }
    </div>
  );
}

export default App;
