import React, { Component, useEffect } from "react";
import WordTiles from "../Components/WordTiles.js";
import {Link} from 'react-router-dom';
import "../Styles/FlexPosition.css";
import "../Styles/Utilities.css";
import "../Styles/Sizes.css";
import "../Styles/Fonts.css";

// The Menu Page.
function HowToPlay() {
    // Tab Name
    useEffect(() => {
        document.title = "Lie Wordle | How To Play";
    }, []);

    // Examples
    const color = [
        ['C', 'gray', 'large'],
        ['O', 'yellow', 'large'],
        ['L', 'gray', 'large'],
        ['O', 'green', 'large'],
        ['R', 'gray', 'large']
    ];
    const green = [['O', 'green', 'large']];
    const yellow = [['O', 'yellow', 'large']];
    const gray = [['R', 'gray', 'large']];
    const blue = [['C', 'blue', 'large']];

    // HTML
    return (<>
        <div className='just-full-screen total-center'>
            <div className='small-box'>
                <br /><br /><br />
                <p className='center-font'>In all the modes, the goal of the game is to guess the hidden five letter words. You get to guess six times, and every time you guess, you get a clue, in the form of colors that are given to each letter tile in your guess. Depending on the game mode, each color can mean different things.</p>
                <h1 className='center-font'>Original Mode</h1>
                <div className='total-center'><WordTiles word={green} /></div>                
                <p className='center-font'>A letter tile will have a green color if the hidden word has that letter in that position.</p>
                <div className='total-center'><WordTiles word={yellow} /></div>
                <p className='center-font'>A letter tile will have a yellow letter if there is that letter in the word, but not in the right position.</p>
                <div className='total-center'><WordTiles word={gray} /></div>
                <p className='center-font'>Any other letter tile will have a gray color.</p>
                <div className='total-center'><WordTiles word={color} /></div>
                <p className='center-font'>When a letter is repeated in your guess, we apply the coloring rule in the above order, so the above clue means there is no C, L, or R in the word, but there are two O's, one in the fourth position, one not in the second position.</p>
                <h1 className='center-font'>Reduced Mode</h1>
                <div className='total-center'><WordTiles word={blue} /></div>
                <p className='center-font'>This mode is similar to the original mode, but each guess will have one blue tile somewhere at random. A blue tile does not mean anything, it is meant to give you no information about that letter. This new coloring rule is applied after the three introduced in the original mode.</p>
                <h1 className='center-font'>Lying Mode</h1>
                <p className='center-font'>Just like the reduced mode, but instead of a blue tile, we just out right lie to you. You also do not know which tile is a lie.</p>
                <div className='center'>
                    <Link to='/'><button className="retry-and-home green">Home</button></Link>
                </div>
                <br /><br /><br />
            </div>
        </div>
    </>);
}

export default HowToPlay;