import './App.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

let watchedArray = [];
let toWatchArray = [];

function App() {
  const[movies, setMovies] = useState([{
    id: 0,
    title: ''
  }])
  const[search, setSearch] = useState("");
  const[results, setResults] = useState();
  const[clicked, setClicked] = useState(false);
  const[newMovie, setNewMovie] = useState("");
  const[watchedClick, setWatchedClick] = useState(false);
  const[toWatchClick, setToWatchClick] = useState(false);

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

  const handleWatched = (checked, value) => {
    if (checked === true){
      watchedArray.push(value)
      let toWatch = toWatchArray.filter(movie => movie !== value)
      toWatchArray = toWatch
    } else {
      let filtered = watchedArray.filter(movie => movie !== value)
      watchedArray = filtered
      toWatchArray.push(value)
    }
    console.log(watchedArray)
  }

  const handleWatchedList = () => {
    setWatchedClick(true);
  }

  const handleToWatchList = () => {
    setToWatchClick(true)
  }

  const buttonPresses = () => {
    if(clicked === false && watchedClick === false && toWatchClick === false){
      return (
      <>
        <button type="submit" onClick={() => handleWatchedList()}>Watched List</button>
        <button type="submit" onClick={() => handleToWatchList()}>To Watch List</button>
        <input type="search" value={search} placeholder="search for movie" onChange={(event) => setSearch(event.target.value)}></input>
        <button type="submit" onClick={() => handleSearch()}>Search</button>
        <input type="text" value={newMovie} placeholder="add new movie" onChange={(event) => setNewMovie(event.target.value)}></input>
        <button type="submit" onClick={() => handleAdd()}>Add New Movie</button>
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link to='/:id'>
              <div>{movie.title}</div>
            </Link>
            <button type='submit' onClick={() => handleDelete(movie.title)}>Delete</button>
            <label>
              <input type='checkbox' value={movie.title} onChange={(event) => handleWatched(event.target.checked, event.target.value)}/>
              Watched
            </label>
          </div>
        ))}
      </>
      )
    } else if (clicked === true && watchedClick === false && toWatchClick === false){
      return (
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
      )
    } else if (clicked === false && watchedClick === true && toWatchClick === false){
      return (
        <div>
          <>
            <button type='submit' onClick={() => {
              watchedArray = [];
              toWatchArray = [];
              setWatchedClick(false)}}>Go Home</button>
            {watchedArray.map(movie => (
              <>
                <div>{movie}</div>
              </>
            ))}
          </>
        </div>
      )
    } else if (clicked === false && watchedClick === false && toWatchClick === true){
      return(
        <div>
          <>
            <button type='submit' onClick={() => {
              watchedArray = [];
              toWatchArray = [];
              setToWatchClick(false)}}>Go Home</button>
            {toWatchArray.map(movie => (
              <>
                <div>{movie}</div>
              </>
            ))}
          </>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <>
        <div>{buttonPresses()}</div>
      </>
    </div>
  );
}

export default App;