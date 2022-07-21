import '../Styles/Colors.css';
import '../Styles/Sizes.css';
import '../Styles/FlexPosition.css';
import '../Styles/Utilities.css';

// A component that makes one tile.
function LetterTile(props) {
    return (<>
        <div className={props.color + ' square center ' + props.size}>
            {props.letter}
        </div>
    </>);
}

export default LetterTile;