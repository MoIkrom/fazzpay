import React from "react";

export default function PinInput(props) {
  const addPin = (e) => {
    if (e.target.value) {
      const nextSibling = document.getElementById(`pin-${parseInt(e.target.name, 10) + 1}`);

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
    props.setPin({ ...props.pin, [`pin${e.target.name}`]: e.target.value });
  };

  const inputNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleBackspace = (e) => {
    if (e.key === "Backspace") {
      const prevSibling = document.getElementById(`pin-${parseInt(e.target.name, 10) - 1}`);

      if (prevSibling !== null && !e.target.value) {
        prevSibling.focus();
      }
    }
  };

  return (
    <div className="row row-cols-6 gx-3">
      {Object.keys(props.pin).map((digit, index) => (
        <div className="col" key={index}>
          <label htmlFor="pin" className="form-label visually-hidden">
            Input PIN Digit {`${index + 1}`}
          </label>
          <input
            type="text"
            pattern="\d"
            id={`pin-${index + 1}`}
            name={`${index + 1}`}
            className="form-control text-center text-primary px-0 fw-bold fs-5 mb-3"
            maxLength={1}
            onChange={addPin}
            onKeyDown={handleBackspace}
            onKeyPress={inputNumber}
            autoComplete="off"
            value={props.pin[digit]}
          />
        </div>
      ))}
    </div>
  );
}
