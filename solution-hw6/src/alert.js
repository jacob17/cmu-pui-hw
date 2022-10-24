import React from 'react';

function Alert(props) {
  return (
      <div className="alert show">
        Added to cart:<br />
        <br />
        <span className="alert-name">{props.name}</span><br />
        <span className="alert-glazing">{props.glaze}</span><br />
        Pack of <span className="alert-pack">{props.pack}</span><br />
        Price: $ <span className="alert-price">{props.price}</span>
      </div>
    )
}

export default Alert