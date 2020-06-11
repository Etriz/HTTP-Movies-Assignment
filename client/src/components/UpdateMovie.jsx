import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = ({ movies, getMovieList }) => {
  const params = useParams();
  const { push } = useHistory();
  const [formState, setFormState] = useState({
    id: params.id,
    director: "",
    title: "",
    metascore: "",
    stars: [],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, formState)
      .then((res) => {
        // console.log(res.data);
        getMovieList();
        push("/");
      })
      .catch((err) => {
        // console.log("update submit", err.message, err.response);
        setError("All fields must be filled in");
      });
  };
  useEffect(
    () => {
      const movieData = movies.find((item) => item.id === Number(params.id));
      // console.log(movieData);
      setFormState(movieData);
    },
    //eslint-disable-next-line
    []
  );
  return (
    <div className="movie-card">
      <form onSubmit={handleSubmit}>
        <p>Update Movie Form</p>
        <p>
          <label htmlFor="title">
            Title{" "}
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label htmlFor="director">
            Director{" "}
            <input
              type="director"
              id="director"
              name="director"
              value={formState.director}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label htmlFor="metascore">
            Metascore{" "}
            <input
              type="metascore"
              id="metascore"
              name="metascore"
              value={formState.metascore}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label htmlFor="stars">
            Actors{" "}
            <input
              type="stars"
              id="stars"
              name="stars"
              value={formState.stars}
              onChange={handleChange}
            />
          </label>
        </p>
        <button>Update!</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default UpdateMovie;
