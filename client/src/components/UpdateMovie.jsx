import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = (props) => {
  const [formState, setFormState] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const params = useParams();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, { ...formState, id: params.id })
      .then((res) => {
        console.log(res);
        // push("/");
      })
      .catch((err) => console.log("update submit", err.message, err.response));
  };
  return (
    <div className="movie-card">
      <form onSubmit={handleSubmit}>
        Update Movie Form
        <br />
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="director"
            id="director"
            name="director"
            value={formState.director}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="metascore"
            id="metascore"
            name="metascore"
            value={formState.metascore}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="stars">
          Actors
          <input
            type="stars"
            id="stars"
            name="stars"
            value={formState.stars}
            onChange={handleChange}
          />
        </label>
        <button>Update!</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
