const rolls = [
  {
    name: 'Original Cinnamon Roll',
    alt: 'original',
    basePrice: 2.49,
    img: 'assets/original-cinnamon-roll.jpg',
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
  },
]

const packs = [
  {
    pack: 1,
    multiplier: 1
  },
  {
    pack: 3,
    multiplier: 3
  },
  {
    pack: 6,
    multiplier: 5
  },
  {
    pack: 12,
    multiplier: 10
  },
]

const glazings = [
  {
    glaze: 'Keep original',
    cost: 0
  },
  {
    glaze: 'Sugar milk',
    cost: 0
  },
  {
    glaze: 'Vanilla milk',
    cost: 0.5
  },
  {
    glaze: 'Double chocolate',
    cost: 1.5
  }
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
    document.querySelector('')
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




