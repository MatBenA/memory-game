import { useState, useEffect } from "react";
import selectedNames from "./assets/selected-names.json";
import Card from "./components/Card";

import "./App.css";

function App() {
    const [score, setScore] = useState(0);

    //TODO if character is repeated, set score back to zero

    const handleScore = ({ target }) => {
        console.log(target.parentNode.id);
        setScore((prev) => prev + 1);
    };

    //TODO Should shuffle the divs in a random order every time score is updated
    useEffect(() => {
        characters && shuffle(characters);
    }, [score]);

    //TODO if you lose and your current score is greater than your best score
    //set best score to current score
    const [bestScore, setBestScore] = useState(0);

    const [characters, setCharacters] = useState(null);
    //fetches characters in the first render
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

    //

    return (
        <>
            <h1>Memory Card Game!</h1>
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
            <p>
                Get points by clicking on an image but do not click on any more
                than once!
            </p>

            {/* Lists the cards with their respective character */}
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
        </>
    );
}

// declare the function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default App;
