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

  useEffect(() => {
    fetch('http://localhost:8000/movies')
    .then(res => res.json())
    .then(data => setMovies((data)))
  }, [])

  const handleClick = async () => {
    setClicked(true)
    const searchMovie = movies.filter(title => {
      return title.title.toLowerCase().match(search.toLowerCase())
    })
    setResults(searchMovie)
    setSearch("");
  }

  console.log(results)
  return (
    <div className="App">
      {clicked === false ?
      <>
        <input type="search" value={search} placeholder="search for movie" onChange={(event) => setSearch(event.target.value)}></input>
        <button type="submit" onClick={() => handleClick()}>search</button>
        {movies.map(movie => (
          <div key={movie.id}>
            <div>{movie.title}</div>
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
