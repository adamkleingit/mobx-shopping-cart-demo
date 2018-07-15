import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import ShoppingBag from './components/ShoppingBag';
import ProductsList from './components/ProductsList';
import ShoppingCart from './components/ShoppingCart';
import ui from './stores/ui.store';
import cart from './stores/cart.store';
import products from './stores/products.store';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider stores={ ui, cart, products }>
        <div className="App">
          <DevTools />
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
            <ShoppingBag/>
          </header>
          <div className="main-page">
            <ProductsList/>
            <ShoppingCart/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
