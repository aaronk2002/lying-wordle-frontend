import React, { Component } from "react";
import { Link } from "react-router-dom";
import WordTiles from "../Components/WordTiles.js";
import "../Styles/FlexPosition.css";
import "../Styles/Utilities.css";

// The Menu Page.
function Menu() {
    // Information about how tiles are to be arranged for title.
    const lying = [
        ['L', 'gray', 'large'],
        ['Y', 'yellow', 'large'],
        ['I', 'gray', 'large'],
        ['N', 'green', 'large'],
        ['G', 'gray', 'large']
    ];
    const wordle = [
        ['W', 'gray', 'large'],
        ['O', 'yellow', 'large'],
        ['R', 'green', 'large'],
        ['D', 'gray', 'large'],
        ['L', 'gray', 'large'],
        ['E', 'yellow', 'large']
    ];
    const gameTypes = ['original', 'reduced', 'lying'];

    // HTML
    return (<>
        <div className='full-screen'>
            
            <div className="column-flex-cotainer">
                <div className="column-flex-single">
                    <WordTiles word={lying} />
                </div>
                <div className="column-flex-single">
                    <WordTiles word={wordle} />
                </div>
            </div>

            <div className='dead-space' />

            <div className="column-flex-cotainer">
                {gameTypes.map((gameType) =>
                    <div className="column-flex-single">
                        <Link to={'/game/' + gameType}>
                            <button className='level-button gray' type="submit">
                                {gameType.charAt(0).toUpperCase() + gameType.slice(1)} Mode
                            </button>
                        </Link>
                    </div>
                )}
            </div>

        </div>
    </>);
}

export default Menu;