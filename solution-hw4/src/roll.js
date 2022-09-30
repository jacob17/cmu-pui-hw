import React, { Component } from 'react';

class Roll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      glazingData: [
        {
          glazeName: 'Keep original',
          price: 0
        },
        {
          glazeName: 'Sugar milk',
          price: 0
        },
        {
          glazeName: 'Vanilla milk',
          price: 0.5
        },
        {
          glazeName: 'Double chocolate',
          price: 1.5
        }
      ],
      packData: [
        {
          name: 'one',
          quantity: 1,
          multiplier: 1
        },
        {
          name: 'three',
          quantity: 3,
          multiplier: 3
        },
        {
          name: 'six',
          quantity: 6,
          multiplier: 5
        },
        {
          name: 'twelve',
          quantity: 12,
          multiplier: 10
        },
      ],
      selectedGlazePrice: 0,
      selectedGlazeName: 'Keep original',
      selectedPackMultiplier: 1,
      selectedPackQuantity: 1,
      currentPrice: this.props.rollPrice
    }
    this.submitHandler = this.submitHandler.bind(this)
  }

  glazeHandler = (event) => {
    const newGlazeName = event.target.value
    const newGlazePrice = this.state.glazingData.find(glaze => glaze.glazeName === newGlazeName).price
    this.setState(prevState => ({
      ...prevState,
      selectedGlazePrice: newGlazePrice,
      selectedGlazeName: newGlazeName,
    }), () => {
      this.priceCalculator()
    })
  }

  packHandler = (event) => {
    const newPackQuantity = parseInt(event.target.value)
    const newPackMultiplier = this.state.packData.find(pack => pack.quantity === newPackQuantity).multiplier
    this.setState(prevState => ({
      ...prevState,
      selectedPackMultiplier: newPackMultiplier,
      selectedPackQuantity: newPackQuantity
    }), () => {
      this.priceCalculator()
    })
  }

  priceCalculator = () => {
    this.setState(prevState => ({
      ...prevState,
      currentPrice: parseInt((this.props.rollPrice + this.state.selectedGlazePrice) * this.state.selectedPackMultiplier * 100) / 100
    }))
  }
  
  submitHandler = (event) => {
    const submitData = {
      name: this.props.rollName,
      glaze: this.state.selectedGlazeName,
      pack: this.state.selectedPackQuantity,
      price: this.state.currentPrice,
      count: 1
    }
    event.preventDefault();
    this.props.rollCallback(submitData);
  }

  render() {
    return (
      <div className="item-card">
        <img src={process.env.PUBLIC_URL + '/' + this.props.rollImg} alt={`a ${this.props.rollAlt} cinnamon roll`} className="item-img" />
        <div className="item-title">{this.props.rollName}</div>
          <div className="item-options">
          <form id={`form-${this.props.rollAlt}`}>
            <label htmlFor="glazing">Glazing:</label>
            <select className="glazing" name={`glazing-${this.props.rollAlt}`} id={`glazing-${this.props.rollAlt}`} onChange={this.glazeHandler}>
              {
                this.state.glazingData.map((glaze, idx) => {
                  return <option key={idx} value={`${glaze.glazeName}`}>{glaze.glazeName}</option>
                })
              }
              </select>
              <label htmlFor="pack">Pack Size:</label>
              <ul className="pack">
                {
                  this.state.packData.map((pack, idx) => {
                    if (pack.quantity === this.state.selectedPackQuantity) {
                      return <label key={idx} htmlFor={this.props.rollAlt +`-`+ pack.name} className="pack-option selected">
                        <input type="radio" id={this.props.rollAlt + `-` + pack.name} key={idx} name={`pack-${this.props.rollAlt}`} value={pack.quantity} onChange={this.packHandler} />
                        {pack.quantity}
                      </label>
                    } else {
                      return <label key={idx} htmlFor={this.props.rollAlt + `-` + pack.name} className="pack-option">
                        <input type="radio" id={this.props.rollAlt + `-` + pack.name} key={idx} name={`pack-${this.props.rollAlt}`} value={pack.quantity} onChange={this.packHandler} />
                        {pack.quantity}
                      </label>
                    }
                    
                  })
                }
              </ul>
              <span className="price-label">
              $<span id={`price-${this.props.rollAlt}`}>{this.state.currentPrice}</span>
              </span>
            <input type="submit" value="Add To Cart" id={`form-${this.props.rollAlt}`} onClick={this.submitHandler} />
            </form>
          </div>
      </div>
    )
  }
}

export default Roll