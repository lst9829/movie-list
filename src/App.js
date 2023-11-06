import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const[movies, setMovies] = useState([{
    id: 0,
    title: ''
  }])

  useEffect(() => {
    fetch('http://localhost:8000/movies')
    .then(res => res.json())
    .then(data => setMovies((data)))
  }, [])

  return (
    <div className="App">
      {movies.map(movie => (
        <>
          <div>{movie.title}</div>
        </>
      ))}
    </div>
  );
}

export default App;
