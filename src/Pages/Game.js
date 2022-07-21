import React, { useState, useEffect } from "react";
import useKeypress from 'react-use-keypress';
import {Link} from 'react-router-dom';
import WordTiles from "../Components/WordTiles.js";
import '../Styles/Utilities.css';
import '../Styles/FlexPosition.css';
import '../Styles/Colors.css';
import axios from "axios";

// Creates initial blank set of guesses, where each guesses
// are represented by the state of each tiles.
function initialGuesses() {
    let blankGuesses = [];
    for (let i = 0; i <= 5; i++) {
        let newGuess = [];
        for (let j = 0; j < 5; j++) {
            // Initially, all tiles are white, small, and blank.
            newGuess.push(['', 'white', 'small']);
        }
        blankGuesses.push(newGuess);
    }
    return blankGuesses
}

// Given a color from yellow, green, or gray, randomly choose
// a color that is not that color, but still is yellow, green,
// or gray.
function lying(color) {
    let idx = Math.floor(Math.random() * 2);
    switch (color) {
        case 'yellow':
            return idx === 1 ? 'green' : 'gray';
        case 'green':
            return idx === 1 ? 'yellow' : 'gray';
        case 'gray':
            return idx === 1 ? 'green' : 'yellow';
    }
}

// Compares the guess with the actual word
function compareWord(com, player, gameType) {

    // Array of boolean of whether the letter has that color.
    let green = [];
    let yellowPlayer = [];
    let yellowCom = [];
    // Final list of color.
    let colorList = [];

    // Check for green
    for (let i = 0; i < 5; i++) {
        yellowPlayer.push(false);
        yellowCom.push(false);
        if (com[i] === player[i]) {
            green.push(true);
        }
        else {
            green.push(false);
        }
    }

    // Check for yellow.
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (player[i] === com[j] && !yellowCom[j] && !green[i] && !green[j] && i !== j) {
                yellowPlayer[i] = true;
                yellowCom[j] = true;
                break;
            }
        }
    }

    // Make colorList.
    for (let i = 0; i < 5; i++) {
        if (green[i]) {
            colorList.push('green');
        }
        else if (yellowPlayer[i]) {
            colorList.push('yellow');
        }
        else {
            colorList.push('gray');
        }
    }

    // Game Type Change
    if (gameType !== 'Original' && com !== player) {
        let idx = Math.floor(Math.random() * 5);
        let newColor = (gameType === 'Lying') ? lying(colorList[idx]) : 'blue';
        colorList[idx] = newColor;
    }

    return colorList;
}

async function getNewWord() {
    let word = await axios.get('https://lying-wordle-server.herokuapp.com/word/');
    console.log(word.data.word);
    return word.data.word;
}

async function isWord(word) {
    let res = await axios.post('https://lying-wordle-server.herokuapp.com/word/match/', {word: word});
    return Boolean(res.data);
}

// Array of all alphabet, both capitalized and not.
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// Keyboard
const row1 = 'QWERTYUIOP'.split('');
const row2 = 'ASDFGHJKL'.split('');
const row3 = 'ZXCVBNM'.split('');

// How the game looks
const Game = (props) => {
    // States
    const [ans, setAns] = useState('CROSS');
    const [guesses, setGuesses] = useState(initialGuesses());
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [dev, setDev] = useState(0);
    const [game, setGame] = useState('Ongoing');
    useEffect(()=>{
        getNewWord().then(word => {setAns(word);console.log('HERE');});
    }, [])

    // Function to handle enter.
    const handleEnter = () => {
        if (game === 'Ongoing') {
            console.log('Enter');
            setDev(dev + 1);
            if (column === 5 && row !== 6) {
                // Get the guessed word.
                let copyGuesses = JSON.parse(JSON.stringify(guesses));
                let guessWord = '';
                for (let i = 0; i < 5; i++) {
                    guessWord += copyGuesses[row][i][0];
                }
                isWord(guessWord).then((res) => {
                    if (res) {
                        // Get the colors.
                        let colors = compareWord(ans, guessWord, props.gameType);
                        console.log(colors);

                        // Modify board with colors and determine if the guess is correct.
                        let correct = guessWord === ans;
                        for (let i = 0; i < 5; i++) {
                            copyGuesses[row][i][1] = colors[i] + ' white-' + colors[i];
                        }

                        // Input the new states.
                        if (5 === row && !correct) {
                            setGame('Lose');
                        }
                        else if (correct) {
                            setGame('Win');
                        }
                        setGuesses(copyGuesses);
                        setRow(row + 1);
                        setColumn(0);
                    }
                    else {
                        console.log('HERE');
                        for (let i = 0; i < 5; i++) {
                            copyGuesses[row][i][1] = 'white shake' + ((i % 2 === 1) ? '1' : '2');
                        }
                        setGuesses(copyGuesses);
                        setTimeout(() => {
                            for (let i = 0; i < 5; i++) {
                                copyGuesses[row][i][1] = 'white';
                            }
                            setGuesses(copyGuesses);
                        }, 1000)
                    }
                })
            }
        }
    };
    useKeypress('Enter', handleEnter);

    // Function to handle backspace
    const handleBackspace = () => {
        if (game === 'Ongoing') {
            console.log('Backspace');
            setDev(dev + 1);
            if (column > 0) {
                // Change position.
                setColumn(column - 1);
                // Handle erasure of letter.
                let copy = JSON.parse(JSON.stringify(guesses));
                copy[row][column-1][0] = '';
                setGuesses(copy);
            }
        }
    };
    useKeypress('Backspace', handleBackspace);

    // Function to handle alphabet input
    const handleAlphabet = (event) => {
        if (game === 'Ongoing') {
            console.log(event.key);
            setDev(dev + 1);
            if (column < 5) {
                // Handle addition of letter.
                let copy = JSON.parse(JSON.stringify(guesses));
                copy[row][column][0] = event.key.toUpperCase();
                setGuesses(copy);
                // Changes position.
                setColumn(column + 1);
            }
        }
    };
    useKeypress(alphabet, handleAlphabet);

    // Function to handle retry
    const handleRetry = () => {
        console.log('Retry');
        getNewWord().then(word => {setAns(word);console.log('HERE');});
        setColumn(0);
        setRow(0);
        setGuesses(initialGuesses());
        setGame('Ongoing');
    }
    
    return (<>
        <div className='full-screen'>
            
            <p className="title center">{props.gameType + " Mode"}</p>

            <div className="column-flex-cotainer">
                {guesses.map((guess) =>
                    <div className="column-flex-single">
                        <WordTiles word={guess} />
                    </div>
                )}
            </div>

            {game === 'Ongoing' ? 
                <><br />
                <div className="column-flex-cotainer">
                    <div className="column-flex-single">
                        <span className="row-flex-container">
                            {row1.map((letter) => 
                                <button className="row-flex-single key letter-key white" onClick={() => handleAlphabet({key: letter})}>{letter}</button>
                            )}
                        </span>
                    </div>
                    <div className="column-flex-single">
                        <span className="row-flex-container">
                            {row2.map((letter) => 
                                <button className="row-flex-single key letter-key white" onClick={() => handleAlphabet({key: letter})}>{letter}</button>
                            )}
                        </span>
                    </div>
                    <div className="column-flex-single">
                        <span className="row-flex-container">
                            <button className="row-flex-single key other-key white" onClick={handleEnter}>Enter</button>
                            {row3.map((letter) => 
                                <button className="row-flex-single key letter-key white" onClick={() => handleAlphabet({key: letter})}>{letter}</button>
                            )}
                            <button className="row-flex-single key other-key white" onClick={handleBackspace}>Backspace</button>
                        </span>
                    </div>
                </div></>

            :
                <div className="column-flex-cotainer">
                    <p className="column-flex-single game-over-screen">You {game === 'Win' ? <>Won!</> : <>Lost! The Word Was {ans}</>}</p>
                    <div className="column-flex-single center">
                        <span className="row-flex-container">
                            <button className="retry-and-home yellow" onClick={handleRetry}>Retry</button>
                            <Link to='/'>
                                <button className="retry-and-home green">Home</button>
                            </Link>                            
                        </span>
                    </div>
                </div>

            }

            <div className="dead-space" />

        </div>
    </>);
}

export default Game;