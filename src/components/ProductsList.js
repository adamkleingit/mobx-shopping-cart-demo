import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('uiStore', 'cartStore')
@observer
class ProductsList extends Component {
  changeFilter = (el) => this.props.uiStore.setFilter(el.target.value);

  renderProduct = (product) => {
    return (
      <div className="product" key={ product.id }>
        <div className="product-details">
          <h1>{ product.title }</h1>
          <img src={ product.image } width={ 200 } alt={ product.title }/>
        </div>
        <button onClick={ () => this.props.cartStore.addItem(product.id, 1) }>Buy ${ product.price }</button>
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
