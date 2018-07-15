import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

@inject(({ ui }) => { ui })
@observer
class ShoppingCart extends Component {
  render() {
    const { isCartOpen } = this.props.ui;

    return (
      <div className={ `shopping-cart ${isCartOpen ? 'shopping-cart-open' : '' }` }>
        ShoppingCart
      </div>
    );
  }
}

export default ShoppingCart;
