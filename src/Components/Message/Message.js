/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-await-in-loop */
import React, { useState, useRef } from "react";
import morseCode from "../../Morse code/MorseCode";
import dotDash from "../test";

const translateMessage = (object, value) => {
  // Translated message
  let translatedMessage = "";

  // // Split the message into an array split by spaces
  // const splitMessage = value.split(/\s/).filter(Boolean);

  // // Iterate over split message and translate
  // for (let i = 0; i < splitMessage.length; i += 1) {
  //   const currentVal = splitMessage[i];
  //   translatedMessage += object[currentVal];
  // }

  // Iterate over string and translate to morse code
  for (let i = 0; i < value.length; i += 1) {
    const currentChar = value.charAt(i).toLowerCase();
    translatedMessage += `${Object.keys(object).find(
      key => object[key] === currentChar
    )} `;
  }

  // Return result
  return translatedMessage;
};

async function playMessage(dictionary, dot, dash, message) {
  const splitMessage = message.split(/\s/).filter(Boolean);
  const dots = dotDash["."];
  const dashs = dotDash["-"];

  for (let i = 0; i < message.length; i += 1) {
    const currentChar = message.charAt(i);

    switch (currentChar) {
      case ".":
        dots.play();
        await new Promise(r => setTimeout(r, dots.duration + 170));
        break;
      case "-":
        dashs.play();
        await new Promise(r => setTimeout(r, dashs.duration + 277));
        break;
      default:
        break;
    }
  }
}

const Message = () => {
  // Create state hook that will contain value of message
  const [textValue, setValue] = useState("");

  const translatedMessage = useRef("");

  // When the component updates, change the value
  const handleChange = event => {
    setValue(event.target.value);
  };

  const dotAudio = new Audio("/Sounds/e.wav");
  const dashAudio = new Audio("/Sounds/t.wav");

  return (
    <section className="mt3 mb4 ml4 mr4">
      <div className="row mb2">
        {/* <!--Grid column form--> */}
        <div className="col-lg-12 mb-md-0 mb-5">
          <form
            id="contact-form"
            name="contact-form"
            // onSubmit={this.sendMail}
            // onKeyPress={e => {
            //   if (e.key === "Enter" && document.activeElement.id !== "message")
            //     e.preventDefault();
            // }}
          >
            {/* Message */}
            <div className="row">
              <div className="col-md-12">
                <div className="md-form">
                  <textarea
                    className="form-control md-textarea courier"
                    type="text"
                    id="message"
                    name="message"
                    rows="2"
                    value={textValue}
                    onChange={event => handleChange(event)}
                  />
                  <p>Message</p>
                </div>
              </div>
            </div>

            {/* Translated message */}
            <div className="row">
              <div className="col-md-12">
                <div className="md-form">
                  <textarea
                    className="form-control md-textarea courier"
                    id="translatedMessage"
                    ref={translatedMessage}
                    type="text"
                    name="translatedMessage"
                    readOnly="readOnly"
                    rows="2"
                    pattern="[a-z]+"
                    value={translateMessage(morseCode, textValue)}
                  />
                </div>
              </div>
            </div>

            {/* Play button */}
            <div>
              <button
                className="bg-green"
                type="button"
                onClick={() =>
                  playMessage(
                    morseCode,
                    dotAudio,
                    dashAudio,
                    translatedMessage.current.value
                  )
                }
              >
                <img
                  src="/Images/Play.png"
                  alt="play"
                  style={{ width: "30px", height: "auto" }}
                />
              </button>
            </div>

            {/* Submit button */}
            <div className="text-center text-md-left">
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>

            {/* Submit message */}
            {/* <p
              id="submit-message"
              className={animation}
              style={{ visibility: visible }}
            >
              &zwnj;
              {submitText}
            </p> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Message;
