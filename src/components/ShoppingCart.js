import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('uiStore', 'cartStore')
@observer
class ShoppingCart extends Component {
  toggleCart = () => this.props.uiStore.toggleCart();

  renderItem = (item) => (
    <div className="cart-item" key={item.productId}>
      <div className="flex-row">
        <div className="cart-item-image" style={{backgroundImage: `url(${item.product.image})`}}/>
        <div className="flex-column">
          <div className="cart-item-title">{ item.product.title }</div>
          <div className="cart-item-price">${ item.totalPrice }</div>
        </div>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => this.props.cartStore.updateItem(item.productId, item.quantity + 1)}>+</button>
        <span>{ item.quantity }</span>
        <button onClick={() => this.props.cartStore.updateItem(item.productId, item.quantity - 1)}>-</button>
      </div>
      <button className="cart-item-remove" onClick={() => this.props.cartStore.removeItem(item.productId)}>X</button>
    </div>
  );

  renderEmpty = () => (
    <div className="cart-empty">
      Your cart is empty
    </div>
  )

  render() {
    const { isCartOpen } = this.props.uiStore;
    const { itemsArray, totalPrice } = this.props.cartStore;

    return (
      <div className={ `shopping-cart ${isCartOpen ? 'shopping-cart-open' : '' }` }>
        {
          itemsArray.length
            ? itemsArray.map(this.renderItem)
            : this.renderEmpty()
        }
        <div className="cart-total">Total: ${totalPrice}</div>
      </div>
    );
  }
}

export default ShoppingCart;
