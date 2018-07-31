import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('beerStore')
@observer
class BeerList extends Component {
  componentDidMount() {
    this.props.beerStore.fetchBeers();
  }

  renderBeer = (beer) => {
    const { id, title } = beer;

    return (
      <li key={ id }>
        <input value={ title } onChange={(e) => beer.update(e.target.value)}/>
        <button onClick={() => this.props.beerStore.removeBeer(id)}>x</button>
      </li>
    );
  }

  render() {
    const { beers } = this.props.beerStore;

    return (
      <div>
        {
          beers ? (
            <React.Fragment>
              <ul>
                { beers.map(this.renderBeer) }
              </ul>
              <button onClick={() => this.props.beerStore.addBeer()}>+</button>
            </React.Fragment>            
          ) : <div>loading...</div>
        }
        <div><Link to="/">Edit your beer</Link></div>
        <div><Link to="/beers">Beer List</Link></div>
      </div>
    );
  }
}

export default BeerList;
