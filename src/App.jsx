import { useState, useEffect } from "react";
import selectedNames from "./assets/selected-names.json";
import Card from "./components/Card";

import "./App.css";

function App() {
    //if character is repeated, set score back to zero
    const [clickedChars, setClickedChars] = useState([]);
    const handleScore = ({ target }) => {
        const clickedId = target.parentNode.id;
        setClickedChars((clickedChar) => {
            const wasClicked = clickedChars.some(
                (charId) => charId === clickedId
            );

            if (wasClicked) {
                return [];
            } else {
                return [...clickedChar, clickedId];
            }
        });
    };

    //if your current score is greater than your
    //best score set best score to current score
    const [bestScore, setBestScore] = useState(0);
    useEffect(() => {
        setBestScore((prevBest) => {
            if (clickedChars.length > prevBest) {
                return clickedChars.length;
            } else {
                return prevBest;
            }
        });
    }, [clickedChars]);

    const [characters, setCharacters] = useState([]);
    //fetches characters in the first render
    //TODO Clean-Up Function
    useEffect(() => {
        fetch("https://stand-by-me.herokuapp.com/api/v1/characters")
            .then((response) => response.json())
            .then((response) =>
                //chooses characters that appear in the selected-names file
                setCharacters(
                    response.filter((char) =>
                        selectedNames.some((name) => char.name === name)
                    )
                )
            );
    }, []);

    //Shuffles the Cards in a random order every time score is updated
    //TODO Clean-Up function
    useEffect(() => {
        characters && setCharacters((chars) => shuffle(chars));
    }, [clickedChars, characters]);

    //

    return (
        <>
            <div className="top-bar">
                <h1>
                    JoJo&apos;s Bizzare Adventure:<br></br> Memory Card Game!
                </h1>
                <div className="score">
                    <div className="score-count">
                        <h3>Score: {clickedChars.length}</h3>
                        <h3>Best Score: {bestScore}</h3>
                    </div>
                    <p>
                        Get points by clicking on an image but do not click on
                        any more than once!
                    </p>
                </div>
            </div>
            {selectedNames.length === bestScore && <h1 className="winner">You Win!</h1>}

            {/* Lists the cards with their respective character */}
            <section>
                {!characters ? (
                    <p>Loading...</p>
                ) : (
                    characters.map((char) => (
                        <Card
                            character={char}
                            onClick={handleScore}
                            id={char.id}
                            key={char.id}
                        />
                    ))
                )}
            </section>
        </>
    );
}

// shuffles an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default App;
