import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject(({ ui }) => { ui })
@observer
class ShoppingBag extends Component {
  handleClick = () => this.props.ui.toggle();
  render() {
    return (
      <div className="shopping-bag" onClick={ this.handleClick }>
        <img src="https://cdn4.iconfinder.com/data/icons/shopping-21/64/shopping-06-512.png"/>
        <span className="shopping-bag-badge">2</span>
      </div>
    );
  }
}

export default ShoppingBag;
