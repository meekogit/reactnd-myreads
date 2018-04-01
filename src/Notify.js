import React from 'react'

function Notify (props) {
  return (
      <div className={`notification-message ${props.status.id}`}>
        {props.status.message}
      </div>
  );
}

export default Notify;
