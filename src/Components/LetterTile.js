import '../Styles/Colors.css';
import '../Styles/Sizes.css';
import '../Styles/FlexPosition.css';
import '../Styles/Utilities.css';
import "../Styles/Fonts.css";
import { useState } from "react";

// A component that makes one tile.
function LetterTile(props) {
    // Check width of screen
    const [width, setWidth] = useState(window.innerWidth);

    return (<>
        <div className={props.color + ' square center ' + props.size}>
            {
                width <= 768 ?
                <div className='mobile-center'>
                    {props.letter}
                </div>
                :
                <>{props.letter}</>
            }
        </div>
    </>);
}

export default LetterTile;