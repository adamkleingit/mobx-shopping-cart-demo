import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import ShoppingBag from './components/ShoppingBag';
import ProductsList from './components/ProductsList';
import ShoppingCart from './components/ShoppingCart';
import uiStore from './stores/ui.store';
import cartStore from './stores/cart.store';
import productsStore from './stores/products.store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider { ...{ uiStore, cartStore, productsStore } }>
        <div className="App">
          <DevTools />
          <header className="App-header">
            <h1 className="App-title">MobX Shopping Cart Example</h1>
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
