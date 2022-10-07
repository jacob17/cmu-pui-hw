import React, { Component } from 'react';
import './App.css';
import Roll from './roll'
import Navbar from './navbar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollData: [
        {
          name: 'Original Cinnamon Roll',
          alt: 'original',
          basePrice: 2.49,
          img: 'assets/original-cinnamon-roll.jpg',
          handleCallback: this.handleCallback.bind(this)
        },
        {
          name: 'Apple Cinnamon Roll',
          alt: 'apple',
          basePrice: 3.49,
          img: 'assets/apple-cinnamon-roll.jpg',
        },
        {
          name: 'Raisin Cinnamon Roll',
          alt: 'raisin',
          basePrice: 2.99,
          img: 'assets/raisin-cinnamon-roll.jpg',
        },
        {
          name: 'Walnut Cinnamon Roll',
          alt: 'walnut',
          basePrice: 3.49,
          img: 'assets/walnut-cinnamon-roll.jpg',
        },
        {
          name: 'Double-chocolate Cinnamon Roll',
          alt: 'double-chocolate',
          basePrice: 3.99,
          img: 'assets/double-chocolate-cinnamon-roll.jpg',
        },
        {
          name: 'Strawberry Cinnamon Roll',
          alt: 'strawberry',
          basePrice: 3.99,
          img: 'assets/strawberry-cinnamon-roll.jpg',
        }
      ],
      cartData: [],
      totalPrice: 0,
      totalCount: 0,
      showAlert: false
    }
  }

  handleCallback = (submitData) => {
    const newCartData = this.state.cartData
    newCartData.push(submitData)
    this.setState(prevState => ({
      ...prevState,
      cartData: newCartData,
      showAlert: true
    }), this.handleTotals())
  }

  handleTotals = () => {
    let totalPrice = parseInt(this.state.cartData.reduce((acc, obj) => {
      return acc + obj.price
    }, 0) * 100) / 100
    let totalCount = this.state.cartData.reduce((acc, obj) => {
      return acc + obj.count
    }, 0)
    this.setState(prevState => ({
      ...prevState,
      totalPrice: totalPrice,
      totalCount: totalCount
    }))
  }

  componentDidUpdate() {
    setTimeout(function() {
      this.setState(prevState => ({
        ...prevState,
        showAlert: false }))
    }.bind(this), 3000)
  }

  displayAlert = () => {
    if (this.state.showAlert) {
      return <div className="alert show">
        Added to cart:<br />
        <br />
        <span className="alert-name">{this.state.cartData[this.state.cartData.length - 1].name}</span><br />
        <span className="alert-glazing">{this.state.cartData[this.state.cartData.length - 1].glaze}</span><br />
        Pack of <span className="alert-pack">{this.state.cartData[this.state.cartData.length - 1].pack}</span><br />
        Price: $ <span className="alert-price">{this.state.cartData[this.state.cartData.length - 1].price}</span><br />
        Total Price: $<span>{this.state.totalPrice}</span><br />
        Total Items: <span>{this.state.totalCount}</span>
      </div>
    }
  }

  displayNavTotal = () => {
      return <div className="cart-summary">
        <span className="cart-count">{this.state.totalCount} item</span><br />
        <span className="cart-total">$ {this.state.totalPrice}</span>
      </div>
  }

  render() {
    return (
      <div className="App">
        <nav>
          <img className="logo" src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} alt="logo" />
          <Navbar />
          {this.displayNavTotal()}
          <div className="title">Our hand-made cinnamon rolls</div>
        </nav>
        <main>
          {this.state.rollData.map(function (roll, idx) {
            return <Roll
              key={idx}
              rollName={roll.name}
              rollAlt={roll.alt}
              rollPrice={roll.basePrice}
              rollImg={roll.img}
              rollCallback={this.handleCallback}
               />
          }, this)}
        </main>
        {this.displayAlert()}
      </div>
    );
  }
}

export default App;
