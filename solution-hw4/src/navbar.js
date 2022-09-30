import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <div className="navbar">
        <div className="nav-item active">Products</div>
        <div className="nav-item">Cart</div>
      </div>
    )
  }
}

export default Navbar