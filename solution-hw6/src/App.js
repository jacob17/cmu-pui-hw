import React, { Component } from 'react';
import './App.css';
import Roll from './roll'
import CartRoll from './cartRoll'


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
      filteredRollData: [],
      searchTerm: '',
      cartData: JSON.parse(localStorage.getItem("cartData")) || [],
      totalPrice: 0,
      totalCount: 0,
      showAlert: false,
      cartDisplay: false,
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
  
  componentDidMount() {
    localStorage.setItem("cartData",
      JSON.stringify(this.state.cartData));
    this.setState(prevState => ({
      ...prevState,
      filteredRollData: this.state.rollData
    }))
  }

  componentDidUpdate() {
    localStorage.setItem("cartData",
      JSON.stringify(this.state.cartData));
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

  handleSearchString = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    this.setState((prevState) => ({
      ...prevState,
      searchTerm: searchTerm
    }))
  }

  handleSearchRender = () => {
    this.setState((prevState) => ({
      ...prevState,
      filteredRollData: this.state.rollData.filter(roll => roll.name.toLowerCase().indexOf(this.state.searchTerm) !== -1)
    }))
  }

  handleSort = (event) => {
    const sortTarget = event.target.value
    const sortedRollData = this.state.filteredRollData.sort((a, b) => {
      if (sortTarget === 'name') {
        const fa = a.name.toLowerCase()
        const fb = b.name.toLowerCase()
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }
      return a.basePrice - b.basePrice
    })
    this.setState((prevState) => ({
      ...prevState,
      filteredRollData: sortedRollData
    }))
  }

  handleCartDisplay = () => {
    if (!this.state.cartDisplay) {
      this.setState((prevState) => ({
        ...prevState,
        cartDisplay: true
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        cartDisplay: false
      }))
    }
  }
  
  handleRemove = (rollIndex) => {
    const updatedCart = this.state.cartData
    updatedCart.splice(rollIndex, 1)
    this.setState(prevState => ({
      ...prevState,
      cartData: updatedCart
    }))
    this.handleTotals()
  }

  render() {
    return (
      <div className="App">
        <nav>
          <img className="logo" src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} alt="logo" />
          <div className="navbar">
            <div className="nav-item active" id="navbar-products">Products</div>
            <div className="nav-item" id="navbar-cart" onClick={this.handleCartDisplay}>Cart</div>
          </div>
          {this.displayNavTotal()}
          <div className="title">Our hand-made cinnamon rolls</div>
        </nav>
        <section 
        role='cart'
        style={this.state.cartDisplay ? {display: 'block'}: {display: 'none'}}
        >
          <div className="cart-title">
            <span>Shopping Cart ({this.state.totalCount ? this.state.totalCount : 0} item)</span>
            <span>Total: ${this.state.totalPrice ? this.state.totalPrice : 0}</span>
          </div>
          <div className="cart-content" style={{overflowX: 'scroll'}}>
            {this.state.cartData.map(function (roll, idx) {
              return <CartRoll
                key={idx}
                rollIndex={idx}
                rollName={roll.name} //
                rollAlt={this.state.rollData.find(o => o.name === roll.name).alt}
                rollPrice={roll.price} //
                rollGlazing={roll.glaze} //
                rollPack={roll.pack} //
                rollImg={this.state.rollData.find(o => o.name === roll.name).img}
                onRemove={this.handleRemove} />
            }, this)}
          </div>
        </section>
        <section role='search'>
          <input type="text" name="s" onChange={this.handleSearchString} />
          <button type="submit" className="search-submit" onClick={this.handleSearchRender}>Search</button>
          <label htmlFor="sort">Sort by:</label>
          <select name="sort" id="sort" onChange={this.handleSort}>
            <option value="name">Name</option>
            <option value="basePrice">Base Price</option>
          </select>
        </section>
        <main>
          {this.state.filteredRollData.length !== 0 ?
          this.state.filteredRollData.map(function (roll, idx) {
            return <Roll
              key={idx}
              rollName={roll.name}
              rollAlt={roll.alt}
              rollPrice={roll.basePrice}
              rollImg={roll.img}
              rollCallback={this.handleCallback}
              rollAlert={this.handleAlert}
               />
          }, this) : 
            <div className="noResults">
              No match!
            </div>
          }
        </main>
        {this.displayAlert()}
      </div>
    );
  }
}

export default App;
