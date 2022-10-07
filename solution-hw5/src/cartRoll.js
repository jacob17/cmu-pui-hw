import React, { Component } from 'react';

class CartRoll extends Component {
  render () {
    return <div className="cart-roll">
      <img src={this.props.rollImg} alt={this.props.rollAlt} />
      <span>{this.props.rollName}</span><br />
      Glazing: <span>{this.props.rollGlaze}</span><br />
      Pack Size: <span>{this.props.rollPack}</span><br />
      <span style={{fontWeight: 'bold'}}>$ <span>{this.props.rollPrice}</span></span>
    </div>
  }
}

export default CartRoll