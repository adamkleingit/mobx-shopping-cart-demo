import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
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
      <div key={ id }>
        <TextField autoFocus value={ title } onChange={(e) => beer.update(e.target.value)}/>
        <DeleteIcon style={{cursor: 'pointer'}} onClick={() => this.props.beerStore.removeBeer(id)} />
      </div>
    );
  }

  render() {
    const { beers } = this.props.beerStore;

    return (
      <div>
        {
          beers ? (
            <React.Fragment>
              { beers.map(this.renderBeer) }
            
              <div>
                <AddIcon style={{cursor: 'pointer', marginTop: 10}} onClick={() => this.props.beerStore.addBeer()}/>
              </div>
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
