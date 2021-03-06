import React from "react";
import "../stylesheet/App.scss";
import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { getDataFromApi } from "../services/api";
import Header from "./Header/Header";
import CharacterList from "./CharacterList/CharacterList";
import Filters from "./Filter/Filters";
import CharacterDetail from "./CharacterDetail/CharacterDetail";
import Load from "./Load/Load";
import jerry from "../images/jerry-error.png";
import portal from "../images/home-portal.png";

const App = () => {
  // State
  const [characters, setCharacters] = useState([]);
  const [userInput, setUserInput] = useState(
    localStorage.getItem("name") || ""
  );
  const [load, setLoad] = useState(true);

  // Life cycle
  useEffect(() => {
    setLoad(true);
    getDataFromApi().then((data) => {
      setCharacters(data);
      setLoad(false);
    });
  }, []);

  // Filter
  const handleFilter = (userInput) => {
    setUserInput(userInput);
    localStorage.setItem("name", userInput);
  };

  const browsedCharacters = characters.filter((character) => {
    return character.name.toUpperCase().includes(userInput.toUpperCase());
  });

  // Character Detail
  const renderCharacterDetail = (props) => {
    const characterId = parseInt(props.match.params.id);

    const clickedCharacter = characters.find((character) => {
      return characterId === parseInt(character.id);
    });

    // Detail Page
    if (clickedCharacter) {
      return (
        <CharacterDetail
          id={clickedCharacter.id}
          image={clickedCharacter.image}
          name={clickedCharacter.name}
          status={clickedCharacter.status}
          species={clickedCharacter.species}
          origin={clickedCharacter.origin.name}
          episodes={clickedCharacter.episode.length}
        />
      );

      // Error Page
    } else {
      return (
        <div className="character-missing">
          <Link to="/" className="home-link" title="Home portal">
            <img src={portal} alt="Home-portal" className="home-link__icon" />
            <p className="home-link__text">Home</p>
          </Link>
          <p className="character-missing__text">Page not found</p>
          <img
            src={jerry}
            alt="Page not found"
            className="character-missing__image"
          />
        </div>
      );
    }
  };

  // Return
  return (
    <>
      <Header />
      {load === true ? <Load /> : null}
      <main className="main">
        <div className="main__box">
          <Switch>
            <Route exact path="/">
              <Filters
                characters={characters}
                sendFilter={handleFilter}
                userInput={userInput}
              />
              <CharacterList characters={browsedCharacters} />
            </Route>

            <Route
              path="/character-dertail/:id"
              component={renderCharacterDetail}
            />
          </Switch>
        </div>
      </main>
    </>
  );
};

export default App;
