import '../Styles/Colors.css';
import '../Styles/Sizes.css';
import '../Styles/FlexPosition.css';
import '../Styles/Utilities.css';
import {BrowserView, MobileView} from 'react-device-detect';

// A component that makes one tile.
function LetterTile(props) {
    return (<>
        <div className={props.color + ' square center ' + props.size}>
            <MobileView>
                <div className='mobile-center center'>
                    <p className='remove-margin center'>{props.letter}</p>
                </div>
            </MobileView>
            <BrowserView>{props.letter}</BrowserView>
        </div>
    </>);
}

export default LetterTile;