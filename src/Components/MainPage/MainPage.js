/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-await-in-loop */
import React, { useState, useEffect } from "react";
import morseCode from "../../Morse code/MorseCode";
import ListenButton from "../Buttons/ListenButton";
import Message from "../MessageBox/Message";

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

const MainPage = () => {
  // Create state hook that will contain value of message
  // Create state hook that contains whether audio playing or not
  const [textValue, setValue] = useState("");
  const [translatedMessage, setTransValue] = useState("");

  // Whenever textValue changes, set the translated value as well
  useEffect(() => {
    setTransValue(() => translateMessage(morseCode, textValue));
  }, [textValue]);

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
            <Message
              id="message"
              title="Message"
              // ref={messageRef}
              text={textValue}
              change={e => setValue(e.target.value)}
              disabled={false}
            />

            {/* Translated message */}
            <Message
              id="translatedMessage"
              title="Translated Message"
              text={translatedMessage}
              change={null}
              disabled
            />

            <ListenButton messageVal={translatedMessage} />

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

export default MainPage;
