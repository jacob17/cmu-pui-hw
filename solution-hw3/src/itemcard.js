import React, { Component } from 'react';

class Itemcard extends Component {
  constructor(props) {
    super(props)
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
    }
  }
  render() {
    return (
      <div class="item-card">
        <img src={process.env.PUBLIC_URL + '/' +this.state.itemData[this.props.index].img} alt={`a picture of a ${this.state.itemData[this.props.index].alt} cinnamon roll`} class="item-img" />
        <div class="item-title">{this.state.itemData[this.props.index].name}</div>
          <div class="item-options">
          <form onsubmit="return false;" id={`form-${this.state.itemData[this.props.index].alt}`}>
              <label for="glazing">Glazing:</label>
            <select class="glazing" name={`glazing-${this.state.itemData[this.props.index].alt}`} id={`glazing-${this.state.itemData[this.props.index].alt}`}>
                <option value='Keep original'>Keep original</option>
                <option value='Sugar milk'>Sugar milk</option>
                <option value='Vanilla milk'>Vanilla milk</option>
                <option value='Double chocolate'>Double chocolate</option>
              </select>
              <label for="pack">Pack Size:</label>
              <ul class="pack">
                <label for="one" class="pack-option selected">
                <input type="radio" name={`pack-${this.state.itemData[this.props.index].alt}`} value={1} checked/>
                  1
                </label>
                <label for="three" class="pack-option">
                <input type="radio" name={`pack-${this.state.itemData[this.props.index].alt}`} value={3}/>
                  3
                </label>
                <label for="six" class="pack-option">
                <input type="radio" name={`pack-${this.state.itemData[this.props.index].alt}`} value={6}/>
                  6
                </label>
                <label for="twelve" class="pack-option">
                <input type="radio" name={`pack-${this.state.itemData[this.props.index].alt}`} value={12}/>
                  12
                </label>
              </ul>
              <span class="price-label">
              $<span id={`price-${this.state.itemData[this.props.index].alt}`}>{this.state.itemData[this.props.index].prices[1]}</span>
              </span>
            <input type="submit" value="Add To Cart" id={`submit-${this.state.itemData[0].alt}`} name={`form-${this.state.itemData[this.props.index].alt}`}/>
            </form>
          </div>
      </div>
    )
  }
}

export default Itemcard