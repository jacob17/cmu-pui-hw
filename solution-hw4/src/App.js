// import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Roll from './roll'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: [
        {
          name: 'Original Cinnamon Roll',
          alt: 'original',
          prices: {
            1: 2.49,
            3: 6.35,
            6: 12.7,
            12: 25.4
          },
          img: 'assets/original-cinnamon-roll.jpg',
        },
        {
          name: 'Apple Cinnamon Roll',
          alt: 'apple',
          prices: {
            1: 3.49,
            3: 8.9,
            6: 17.8,
            12: 35.6
          },
          img: 'assets/apple-cinnamon-roll.jpg',
        },
        {
          name: 'Raisin Cinnamon Roll',
          alt: 'raisin',
          prices: {
            1: 2.99,
            3: 7.63,
            6: 15.25,
            12: 30.5
          },
          img: 'assets/raisin-cinnamon-roll.jpg',
        },
        {
          name: 'Walnut Cinnamon Roll',
          alt: 'walnut',
          prices: {
            1: 3.49,
            3: 8.9,
            6: 17.8,
            12: 35.6
          },
          img: 'assets/walnut-cinnamon-roll.jpg',
        },
        {
          name: 'Double-chocolate Cinnamon Roll',
          alt: 'double-chocolate',
          prices: {
            1: 3.99,
            3: 10.18,
            6: 20.35,
            12: 40.7
          },
          img: 'assets/double-chocolate-cinnamon-roll.jpg',
        },
        {
          name: 'Strawberry Cinnamon Roll',
          alt: 'strawberry',
          prices: {
            1: 3.99,
            3: 10.18,
            6: 20.35,
            12: 40.7
          },
          img: 'assets/strawberry-cinnamon-roll.jpg',
        }
      ]
    };
  }

  render () {
    return (
      <div className="App">
        <nav>
          <img class="logo" src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} alt="logo" />
          <div class="navbar">
            <div class="nav-item active">Products</div>
            <div class="nav-item">Cart</div>
          </div>
          <div class="cart-summary">
            <span class="cart-count">0 item</span><br />
            <span class="cart-total">$ 0</span>
          </div>
          <div class="title">Our hand-made cinnamon rolls</div>
        </nav>
        <main>
          <Roll
            index={0}/>
          <Roll
            index={1}/>
          <Roll
            index={2}/>
          <Roll
            index={3}/>
          <Roll
            index={4}/>
          <Roll
            index={5}/>
        </main>
        <div class="alert">

        </div>
      </div>
    );
  }
}

export default App;
