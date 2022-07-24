import axios from "axios";
import React, { useState } from "react";

const ModifyDB = () => {
    const [myWord, setMyWord] = useState([]);
    const [last, setLast] = useState(0);
    const alph = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    // Tab Name
    useEffect(() => {
        document.title = "Lie Wordle | Modify DB";
    }, []);

    // Determines if a word has only five alphabetic
    // characters (\r allowed at the end).
    const isFive = (word) => {
        if (word.slice(5, 6) === '\r') {
            return isFive(word.slice(0, 5));
        }
        if (word.length !== 5) {
            return false;
        }
        const parsed = word.split("");
        for (let idx = 0; idx < 5; idx++) {
            if (!alph.includes(parsed[idx])) {
                return false;
            }
        }
        return true;
    }

    // Extract all five letter words from a text.
    const extractWords = (text) => {
        const parsed = text.split("\n");
        let myWords = []
        for (let idx = 0; idx < parsed.length; idx++) {
            if (isFive(parsed[idx])) {
                myWords.push(parsed[idx].toUpperCase().slice(0, 5));
            }
        }
        return myWords;
    }

    // Extract all five letter words from a document.
    const getFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => { 
            const text = await (e.target.result);
            setMyWord(extractWords(text));
            setLast(extractWords(text).length - 1);
        };
        reader.readAsText(e.target.files[0]);
    };

    // Post all five letter words in a loaded document.
    const postWords = async (start, end) => {
        for (let idx = start; idx < end; idx++) {
            await axios.post('https://lying-wordle-server.herokuapp.com/word/new', {word: myWord[idx]}).then(() => {
                console.log('SUCCESS');
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    // Delete DB.
    const deleteDB = () => {
        console.log('Entering Function');
        axios.delete('https://lying-wordle-server.herokuapp.com/word/erase').then(() => {
            console.log('SUCCESS');
        }).catch((err) => {
            console.log(err)
        });
    }
    
    return (<>
        Get Words
        <br />
        <input type="file" onChange={(e) => getFile(e)} />
        <br />
        <br />
        <button onClick={() => postWords(0, 21952)}>Upload</button>
        <br />
        <br />
        <button onClick={deleteDB}>Delete DB</button>
    </>)
}

export default ModifyDB;