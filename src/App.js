import logo from './logo.svg';
import './App.css';

function App() {

  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

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
