import axios from "axios";
import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./App.css";

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState();
  const [options, setOptions] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/").then((resp) => {
      let response = resp.data.results.map((item) => {
        const id = item.url.split("/");
        return { value: parseInt(id[id.length - 2]), label: item.name };
      });
      setOptions(response);
    });
  }, []);
  const onSelectMovie = (data) => {
    axios
      .get(`https://swapi.dev/api/people/${data.value}`)
      .then(async (resp) => {
        const lastMovie = await resp.data.films.pop();
        const filmData = await axios.get(lastMovie);
        console.log({ filmData });
        let data = await {
          ...resp.data,
          lastWorked: filmData.data.release_date,
          lastMovie: filmData.data.title,
        };
        setMovieDetails(data);
      });
    setSelectedCharacter(data);
  };
  return (
    <div className="App">
      <Select
        value={selectedCharacter}
        onChange={onSelectMovie}
        options={options}
        className="select-box"
      />
      {!isEmpty(movieDetails) ? (
        <div className="movie-details-wrap">
          <div className="movie-name-details">
            <h6>{movieDetails?.name}</h6>
          </div>
          <div className="movie-cast-details">
            <h6>
              <span>Eye Color : </span>
              {movieDetails?.eye_color}
            </h6>
            <h6>
              <span>Hair Color : </span>
              {movieDetails?.hair_color}
            </h6>
            <h6>
              <span>Height : </span>
              {movieDetails?.height}
            </h6>
            <h6>
              <span>Last Worked Year : </span>
              {movieDetails?.lastWorked}
            </h6>
            <h6>
              <span>Last Worked Movie : </span>
              {movieDetails?.lastMovie}
            </h6>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
