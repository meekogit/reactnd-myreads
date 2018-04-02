import React from 'react';
import PropTypes from 'prop-types';

function Notify (props) {
  const { type, message } = props.status;
  return (
      <div className="notification">
        {(type === 'spinner') ? (
          <Spinner />
        ) : (type === 'no-results') ? (
          <Watermark
            type={type}
            message={message}
          />
        ) : (
          <MessageBox
            type ={type}
            message={message}
          />
        )}
      </div>
  );
}

Notify.propTypes = {
  status: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string
  })
}

function Watermark(props) {
  const { type, message } = props;
  return <div className={`watermark ${type}`}>
            {message}
          </div>;
}

function Spinner() {
  return <div className="sk-circle">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
          </div>;
}

function MessageBox(props) {
  const { type, message } = props;
  return  <div className={`notification-message ${type}`}>
            {message}
          </div>;
}

export default Notify;
