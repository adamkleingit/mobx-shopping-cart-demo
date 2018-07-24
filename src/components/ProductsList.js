import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('uiStore', 'cartStore')
@observer
class ProductsList extends Component {
  changeFilter = (el) => this.props.uiStore.setFilter(el.target.value);

  addToCart = (productId) => {
    this.props.cartStore.addItem(productId, 1)
    this.props.uiStore.openCart();
  }

  renderProduct = (product) => {
    return (
      <div className="product" key={ product.id }>
        <div className="product-details">
          <h1>{ product.title }</h1>
          <img src={ product.image } width={ 200 } alt={ product.title }/>
        </div>
        <button onClick={ () => this.addToCart(product.id) }>Buy ${ product.price }</button>
      </div>
    )
  }
  render() {
    return (
      <div className="products-list">
        <label>
          Search
          <input value={ this.props.uiStore.filter } onChange={ this.changeFilter }/>
        </label>
        <div className="products-list-items">
          { this.props.uiStore.filteredItems.map(this.renderProduct) }
        </div>
      </div>
    );
  }
}

export default ProductsList;
