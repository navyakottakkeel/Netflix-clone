import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";
import "./MovieDetail.css";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const MovieDetail = () => {
  const { id } = useParams();

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useWatchlist();

  const [movie, setMovie] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjA1OTk4YzIzYWI3Yzk2NTQ0ZTcyZTQ2YTdmZTJjOSIsIm5iZiI6MTc4NjA2OTk4OS4yNDgsInN1YiI6IjZhNzU0M2U1NzFhYmJjYTQzODMzNGI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o2vE4ooRRwEqcQOA_z6rOhhG_1luy80wKNf8pdRP_v4",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("MOVIE DETAILS:", data);
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
      });
  }, [id]);

  if (!movie) {
    return (
      <div className="movie-loading">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    );
  }

  const saved = isInWatchlist(movie.id);

  return (
    <div className="movie-detail">

      {/* Backdrop */}
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >

        {/* Dark overlay */}
        <div className="movie-overlay">

          {/* Back button */}
          <Link to="/" className="back-button">
            ← Back
          </Link>

          {/* Main content */}
          <div className="movie-container">

            {/* Poster */}
            <div className="movie-poster-wrapper">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            {/* Details */}
            <div className="movie-content">

              <h1>{movie.title}</h1>

              <div className="movie-info">
                <span className="rating">
                  ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                </span>

                <span>
                  {movie.release_date?.slice(0, 4)}
                </span>

                <span>
                  {movie.runtime
                    ? `${movie.runtime} min`
                    : "Runtime N/A"}
                </span>
              </div>

              {/* Genres */}
              <div className="movie-genres">
                {movie.genres?.map((genre) => (
                  <span key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="movie-overview">
                {movie.overview || "No overview available."}
              </p>

              {/* Buttons */}
              <div className="movie-buttons">

                <Link to={`/player/${movie.id}`}>
                  <button className="play-btn">
                    ▶ Play
                  </button>
                </Link>

                <button
                  className="watchlist-btn"
                  onClick={() => {
                    if (saved) {
                      removeFromWatchlist(movie.id);
                    } else {
                      addToWatchlist(movie);
                    }
                  }}
                >
                  {saved
                    ? "✓ Remove from Watchlist"
                    : "+ Add to Watchlist"}
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetail;