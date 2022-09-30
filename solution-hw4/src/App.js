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
          // handleCallback: this.handleCallback.bind(this)
        },
        {
          name: 'Apple Cinnamon Roll',
          alt: 'apple',
          basePrice: 3.49,
          img: 'assets/apple-cinnamon-roll.jpg',
          // handleCallback: this.handleCallback.bind(this)
        },
        {
          name: 'Raisin Cinnamon Roll',
          alt: 'raisin',
          basePrice: 2.99,
          img: 'assets/raisin-cinnamon-roll.jpg',
          // handleCallback: this.handleCallback.bind(this)
        },
        {
          name: 'Walnut Cinnamon Roll',
          alt: 'walnut',
          basePrice: 3.49,
          img: 'assets/walnut-cinnamon-roll.jpg',
          // handleCallback: this.handleCallback.bind(this)
        },
        {
          name: 'Double-chocolate Cinnamon Roll',
          alt: 'double-chocolate',
          basePrice: 3.99,
          img: 'assets/double-chocolate-cinnamon-roll.jpg',
          // handleCallback: this.handleCallback.bind(this)
        },
        {
          name: 'Strawberry Cinnamon Roll',
          alt: 'strawberry',
          basePrice: 3.99,
          img: 'assets/strawberry-cinnamon-roll.jpg',
          // handleCallback: this.handleCallback.bind(this)
        }
      ],
      cartData: [],
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
      let totalPrice = parseInt(this.state.cartData.reduce((acc, obj) => {
        return acc + obj.price
      }, 0)*100)/100
      let totalCount = this.state.cartData.reduce((acc, obj) => {
        return acc + obj.count
      }, 0)
      return <div className="alert show">
        Added to cart:<br />
        <br />
        <span className="alert-name">{this.state.cartData[this.state.cartData.length - 1].name}</span><br />
        <span className="alert-glazing">{this.state.cartData[this.state.cartData.length - 1].glaze}</span><br />
        Pack of <span className="alert-pack">{this.state.cartData[this.state.cartData.length - 1].pack}</span><br />
        Price: $ <span className="alert-price">{this.state.cartData[this.state.cartData.length - 1].price}</span><br />
        Total Price: $<span>{totalPrice}</span><br />
        Total Items: <span>{totalCount}</span>
      </div>
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <img className="logo" src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} alt="logo" />
          <Navbar />
          <div className="cart-summary">
            <span className="cart-count">0 item</span><br />
            <span className="cart-total">$ 0</span>
          </div>
          <div className="title">Our hand-made cinnamon rolls</div>
        </nav>
        <main>
          {/* {this.state.rollData.map(function (roll, idx) {
            return <Roll
              key={idx}
              rollName={roll.name}
              rollAlt={roll.alt}
              rollPrice={roll.basePrice}
              rollImg={roll.img}
              rollCallback={() => this.handleCallback()}
               />
          })} */}
          <Roll
            rollName={this.state.rollData[0].name}
            rollAlt={this.state.rollData[0].alt}
            rollPrice={this.state.rollData[0].basePrice}
            rollImg={this.state.rollData[0].img}
            rollCallback={this.handleCallback}
            rollAlert={this.handleAlert}
          />
          <Roll
            rollName={this.state.rollData[1].name}
            rollAlt={this.state.rollData[1].alt}
            rollPrice={this.state.rollData[1].basePrice}
            rollImg={this.state.rollData[1].img}
            rollCallback={this.handleCallback}
            rollAlert={this.handleAlert}
          />
          <Roll
            rollName={this.state.rollData[2].name}
            rollAlt={this.state.rollData[2].alt}
            rollPrice={this.state.rollData[2].basePrice}
            rollImg={this.state.rollData[2].img}
            rollCallback={this.handleCallback}
            rollAlert={this.handleAlert}
          />
          <Roll
            rollName={this.state.rollData[3].name}
            rollAlt={this.state.rollData[3].alt}
            rollPrice={this.state.rollData[3].basePrice}
            rollImg={this.state.rollData[3].img}
            rollCallback={this.handleCallback}
            rollAlert={this.handleAlert}
          />
          <Roll
            rollName={this.state.rollData[4].name}
            rollAlt={this.state.rollData[4].alt}
            rollPrice={this.state.rollData[4].basePrice}
            rollImg={this.state.rollData[4].img}
            rollCallback={this.handleCallback}
          />
          <Roll
            rollName={this.state.rollData[5].name}
            rollAlt={this.state.rollData[5].alt}
            rollPrice={this.state.rollData[5].basePrice}
            rollImg={this.state.rollData[5].img}
            rollCallback={this.handleCallback}
            rollAlert={this.handleAlert}
          />
        </main>
        {this.displayAlert()}
      </div>
    );
  }
}

export default App;
