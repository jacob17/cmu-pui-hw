// import logo from './logo.svg';
import './App.css';
import Itemcard from './itemcard'


function App() {
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
        <Itemcard
          index={0} />
        <Itemcard
          index={1} />
        <Itemcard
          index={2} />
        <Itemcard
          index={3} />
        <Itemcard
          index={4} />
        <Itemcard
          index={5} />
      </main>
      <div class="alert">

      </div>
    </div>
  );
}

export default App;
