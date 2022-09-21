const rolls = [
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
  },
]

renderRolls(rolls)

function renderRolls(rolls) {
  document.querySelector('main').innerHTML = ""
  rolls.forEach(roll => {
    document.querySelector('main').innerHTML += `
    <div class="item-card">
      <img src=${roll.img} alt="a picture of a ${roll.alt} cinnamon roll" class="item-img">
      <div class="item-title">${roll.name}</div>
      <div class="item-options">
        <form onsubmit="return false;" id="form-${roll.alt}">
          <label for="glazing">Glazing:</label>
          <select class="glazing" name="glazing-${roll.alt}" id="glazing-${roll.alt}">
            <option value='Keep original'>Keep original</option>
            <option value='Sugar milk'>Sugar milk</option>
            <option value='Vanilla milk'>Vanilla milk</option>
            <option value='Double chocolate'>Double chocolate</option>
          </select>
          <label for="pack">Pack Size:</label>
          <ul class="pack">
            <label for="one" class="pack-option selected">
              <input type="radio" name="pack-${roll.alt}" value=1 checked>
              1
            </label>
            <label for="three" class="pack-option">
              <input type="radio" name="pack-${roll.alt}" value=3>
              3
            </label>
            <label for="six" class="pack-option">
              <input type="radio" name="pack-${roll.alt}" value=6>
              6
            </label>
            <label for="twelve" class="pack-option">
              <input type="radio" name="pack-${roll.alt}" value=12>
              12
            </label>
          </ul>
          <span class="price-label">
            $<span id="price-${roll.alt}">${roll.prices[1]}</span>
          </span>
          <input type="submit" value="Add To Cart" id="submit-${roll.alt}" name="form-${roll.alt}">
        </form>
      </div>
    </div>
    `
  })
}




const optionBoxes = document.querySelectorAll('.pack')

Array.from(optionBoxes).forEach(boxes => {
  boxes.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('pack-option')) {
      const options = target.parentElement.children
      const rollAlt = target.firstElementChild.name.substr(5, target.firstElementChild.name.length - 1)
      const rollPack = target.firstElementChild.value
      Array.from(options).forEach(option => {
        option.classList.remove('selected')
        option.firstElementChild.checked = false
      })
      target.classList.add('selected')
      target.firstElementChild.checked = true
      const priceLabel = document.querySelector(`#price-${rollAlt}`)
      priceLabel.innerText = rolls.find(roll => roll.alt === rollAlt).prices[`${rollPack}`]
    }
  })
})

const submitButtons = document.querySelectorAll('input[type="submit"]')
let shoppingCart = []

class Roll {
  constructor(name, glazing, pack, price) {
    this.name = name
    this.glazing = glazing
    this.pack = pack
    this.price = price
  }
}

Array.from(submitButtons).forEach(submit => {
  submit.addEventListener('click', (event) => {
    event.preventDefault();

    let rollAlt = event.target.id.substr(7, event.target.id.length - 1)
    let rollForm = document.querySelector("#form-" + rollAlt)
    let rollName = rolls.find(roll => roll.alt === rollAlt).name


    let rollFormData = new FormData(rollForm)

    let rollGlazing = rollFormData.get(`glazing-${rollAlt}`)
    let rollPack = rollFormData.get(`pack-${rollAlt}`)
    let rollPrice = rolls.find(roll => roll.alt === rollAlt).prices[`${rollPack}`]
    let newRoll = new Roll(rollName, rollGlazing, rollPack, rollPrice)

    shoppingCart.push(newRoll)

    const alert = document.querySelector('.alert')
    alert.innerHTML = `
      Added to cart:<br>
      <br>
      <span class="alert-name">${newRoll.name}</span><br>
      <span class="alert-glazing">${newRoll.glazing}</span><br>
      Pack of <span class="alert-pack">${newRoll.pack}</span><br>
      Price: $ <span class="alert-price">${newRoll.price}</span>
    `
    let cartCount = shoppingCart.length
    let cartTotal = Math.round(shoppingCart.reduce((accumulator, roll) => {
      return accumulator + roll.price
    }, 0) * 100) / 100

    if (cartCount >= 2) {
      document.querySelector('.cart-count').innerText = `${cartCount} items`
    } else {
      document.querySelector('.cart-count').innerText = `${cartCount} item`
    }
    document.querySelector('.cart-total').innerText = `$ ${cartTotal}`
    alert.classList.add('show')
  })
})




