import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('uiStore', 'cartStore')
@observer
class ShoppingCart extends Component {
  toggleCart = () => this.props.uiStore.toggleCart();

  renderItem = (item) => (
    <div className="cart-item" key={item.productId}>
      <span>{ item.product.title } X { item.quantity } (${ item.totalPrice })</span>
      <button onClick={() => this.props.cartStore.updateItem(item.productId, item.quantity + 1)}>+</button>
      <button onClick={() => this.props.cartStore.updateItem(item.productId, item.quantity - 1)}>-</button>
      <button onClick={() => this.props.cartStore.removeItem(item.productId)}>X</button>
    </div>
  );

  render() {
    const { isCartOpen } = this.props.uiStore;
    const { itemsArray, totalPrice } = this.props.cartStore;

    return (
      <div className={ `shopping-cart ${isCartOpen ? 'shopping-cart-open' : '' }` }>
        <span className="close-cart" onClick={ this.toggleCart }>X</span>
        { itemsArray.map(this.renderItem) }
        <div>Total: {totalPrice}</div>
      </div>
    );
  }
}

export default ShoppingCart;
