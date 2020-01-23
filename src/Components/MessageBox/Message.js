import React from "react";
import PropTypes from "prop-types";

const Message = ({ text, change, disabled, id, title }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="md-form">
          <p>{title}</p>
          <textarea
            className="form-control md-textarea courier"
            type="text"
            id={id}
            name="message"
            rows="2"
            defaultValue={text}
            onChange={change}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  change: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string
};

Message.defaultProps = {
  text: null,
  change: null,
  disabled: false,
  id: null,
  title: null
};

export default Message;
