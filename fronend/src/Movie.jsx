import React, { useState, useEffect } from "react";
import axios from "axios";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [showData, setShowData] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [director, setDirector] = useState("");
  const [movieId, setMovieId] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:8000/api/movies/")
      .then(response => {
        setMovies(response.data);
        setShowData(true);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}`;
  };

  const handleAddMovie = () => {
    const timestamp = new Date().toISOString(); // Get current timestamp
    axios.post("http://localhost:8000/api/movies/", {
      movie_name: movieName,
      director: director,
      timestamp: timestamp
    })
    .then(response => {
      console.log("Movie added successfully: ", response.data);
      setMovieName("");
      setDirector("");
      fetchData(); // Refresh the movie list
    })
    .catch(error => {
      console.error("Error adding movie: ", error);
    });
  };

  const handleFetchMovieById = () => {
    axios.get(`http://localhost:8000/api/movies/${movieId}`)
      .then(response => {
        console.log("Movie fetched successfully: ", response.data);
        setSelectedMovie(response.data);
      })
      .catch(error => {
        console.error("Error fetching movie: ", error);
      });
  };

  const handleDeleteMovieById = () => {
    axios.delete(`http://localhost:8000/api/movies/${movieId}`)
      .then(response => {
        console.log("Movie deleted successfully");
        window.alert("Movie deleted successfully");
        fetchData(); // Refresh the movie list
      })
      .catch(error => {
        console.error("Error deleting movie: ", error);
      });
  };

  return (
    <div>
      <h1>Movies</h1>
      <div className="show-container">
        <input
          type="text"
          placeholder="Enter Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Director Name"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <div className="show-id-container">
        <input
          type="text"
          placeholder="Enter Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
        <button onClick={handleFetchMovieById}>Show Movie by ID</button>
        <button onClick={handleDeleteMovieById}>Delete Movie by ID</button>
      </div>
      <button onClick={fetchData}>Show All Data</button>
      {showData && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <strong>{movie.movie_name}</strong> - {movie.director}, {formatDate(movie.timestamp)}
            </li>
          ))}
        </ul>
      )}
      {selectedMovie && (
        <div className="select-container">
          <h2>Selected Movie</h2>
          <p>
            <strong>{selectedMovie.movie_name}</strong> - {selectedMovie.director}, {formatDate(selectedMovie.timestamp)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Movie;
