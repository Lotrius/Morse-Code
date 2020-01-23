/* eslint-disable no-await-in-loop */
import React, { useState } from "react";
import PropTypes from "prop-types";
import dotDash from "../../Morse code/MorseCodeSoundDict";

const playMessage = async (message, setPlaying) => {
  // Audio is now playing
  setPlaying(true);

  // Split the morse code message
  const splitMessage = message.split(/\s/).filter(Boolean);

  // For every element in the message
  for (let i = 0; i < splitMessage.length; i += 1) {
    // Get the current char and the associated audio
    const currentChar = splitMessage[i];
    const audio = dotDash[currentChar];

    // If the char is "/", pause, otherwise play the audio
    switch (currentChar) {
      case "/":
        await new Promise(r => setTimeout(r, 200));
        break;
      default:
        audio.play();
        break;
    }

    // Cause "/" has its own spacing
    if (currentChar !== "/") {
      // Wait for audio to finish playing before moving on
      while (!audio.ended) {
        await new Promise(r => setTimeout(r, 1));
      }

      // So every audio file has the same amount of space in between
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // Audio no longer playing
  setPlaying(false);
};

const ListenButton = ({ messageVal }) => {
  // Create state whether audio is playing or not
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <button
        className="bg-green"
        type="button"
        disabled={playing}
        onClick={() => playMessage(messageVal, setPlaying)}
      >
        <img
          src="/Images/Play.png"
          alt="play"
          style={{ width: "30px", height: "auto" }}
        />
      </button>
    </div>
  );
};

ListenButton.propTypes = {
  messageVal: PropTypes.string
};

ListenButton.defaultProps = {
  messageVal: ""
};

export default ListenButton;
