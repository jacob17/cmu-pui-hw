import React, { Component } from 'react';

class CartRoll extends Component {
  render () {
    return <div className="cart-roll" style={{
      marginTop: '20px',
      marginRight: '20px',
      width: 'fit-content', 
      letterSpacing: 0}}>
      <img src={process.env.PUBLIC_URL + '/' + this.props.rollImg} alt={this.props.rollAlt} style={{
        width: '180px',
        border: '3px solid black',
        marginBottom: '5px'}}/>
      <div>{this.props.rollName}</div>
      <div>Glazing: <span>{this.props.rollGlazing}</span></div>
      <div>Pack Size: <span>{this.props.rollPack}</span></div>
      <span style={{fontWeight: 'bold'}}>$ <span>{this.props.rollPrice}</span></span>
      <span href="#" style={{color: 'black', textDecoration: 'underline',}} onClick={() => this.props.onRemove(this.props.rollIndex)}>Remove</span>
    </div>
  }
}

export default CartRoll