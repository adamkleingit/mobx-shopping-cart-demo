import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { StyledLink } from './CommonComponents';

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
        <StyledLink to="/">Edit your beer</StyledLink>
        <StyledLink to="/results">Results</StyledLink>
      </div>
    );
  }
}

export default BeerList;
