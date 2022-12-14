import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Figure from "./components/Figure/Figure";
import WrongLetters from "./components/WrongLetters/WrongLetters";
import Word from "./components/Word/Word";
import Notification from "./components/Notification/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from "./helpers/helpers"; //Need to import 'showNotification' function with different name due to there already existing a state with same name


const words = ["dance", "meow", "cream", "concert", "passion", "pineapple"];

let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => 
  {

    const handleKeydown = (event) =>
    {
      const { key, keyCode } = event; //Desctructuring out certain parameters from 'event' object
      
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
  
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
  
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter]);

          } else {
            show(setShowNotification);
          }
        }
      }

    }

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown); //Removing event listener every render so there isn't a new one being added every time

  }, [correctLetters, wrongLetters, playable]); //'useEffect' called everytime these variables change

  function playAgain()
  {
    setPlayable(true);

    //Empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    selectedWord = words[Math.floor(Math.random() * words.length)];
  }

  return (
    <>
      <Header/>
      <div className="game-container">
        <Figure wrongLetters={ wrongLetters } />
        <WrongLetters wrongLetters={ wrongLetters } />
        <Word selectedWord={ selectedWord } correctLetters={ correctLetters }/>
      </div>
      
      <Popup correctLetters={ correctLetters } wrongLetters={ wrongLetters } selectedWord={ selectedWord } setPlayable = { setPlayable } playAgain = { playAgain }/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
