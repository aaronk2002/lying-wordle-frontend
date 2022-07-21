import LetterTile from "./LetterTile.js";
import '../Styles/FlexPosition.css';

// A component that arranges LetterTile components to make a word.
function WordTiles(props) {
    return (<>
        <span className='row-flex-container'>
            {props.word.map((square) =>
                <div className="row-flex-single">
                    <LetterTile letter={square[0]} color={square[1]} size={square[2]} />
                </div>
            )}
        </span>
    </>);
}

export default WordTiles;