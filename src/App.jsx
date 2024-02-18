import { useState } from "react";

import "./App.css";

function App() {
    const [score, setScore] = useState(0);
    const handleScore = () => setScore((prev) => prev + 1);

    const [bestScore, setBestScore] = useState(0);

    return (
        <>
            <h1>Memory Card Game!</h1>
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
            <p>
                Get points by clicking on an image but do not click on any more
                than once!
            </p>
            <section>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
                <div className="card" onClick={handleScore}>tarjeta</div>
            </section>
        </>
    );
}

export default App;
