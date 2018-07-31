import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { omit } from 'lodash/fp';
import api from '../utils/api.utils';

@inject('beerStore')
@observer
class SubmitForm extends Component {
  state = {
    isLoading: false,
    name: '',
    beer: '',
    quantity: 1,
    customBeer: '',
    isCustomBeer: false
  };

  isValid() { 
    return this.state.name && this.state.beer;
  }

  componentDidMount() {
    this.props.beerStore.fetchBeers();

    const savedState = localStorage.getItem('happy-hour-saved-state');

    if (savedState) {
      this.setState(JSON.parse(savedState));
    }
  }

  setName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  setBeer = (e) => {
    this.setState({
      beer: e.target.value,
      isCustomBeer: false
    });
  }
  setCustomBeer = (e) => {
    this.setState({
      customBeer: e.target.value,
      isCustomBeer: true
    });
  }
  setQuantity = (e) => {
    this.setState({ quantity: e.target.value });
  }
  submit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      localStorage.setItem('happy-hour-saved-state', JSON.stringify(
        omit(['isLoading'], this.state)
      ));
      const formData = {
        name: this.state.name,
        beer: this.state.isCustomBeer ? this.state.customBeer : this.state.beer,
        quantity: this.state.quantity,
        sessionId: localStorage.sessionId
      };
      this.setState({ isLoading: true });
      api.createRequest(formData)
        .then(() => this.props.history.push('/results'));
    }
  }

  renderBeerOption = ({ title }) => (
    <option key={title} value={title}>{ title }</option>
  );

  render() {
    const { beers } = this.props.beerStore;
    const { isLoading } = this.state;

    return (
      <div>
        { beers ? (
            <form onSubmit={ this.submit }>
              <StyledLabel>
                <span>Your Name:</span>
                <input disabled={ isLoading } required onChange={this.setName} value={this.state.name}/>
              </StyledLabel>
              <StyledLabel>
                <span>Beer:</span>
                <input disabled={ isLoading } type="radio" checked={!this.state.isCustomBeer} onChange={ () => this.setState({ isCustomBeer: false }) }/>
                <select disabled={ isLoading } onChange={this.setBeer} value={this.state.beer}>
                  { beers.map(this.renderBeerOption) }
                </select>
                <input disabled={ isLoading } type="radio" checked={this.state.isCustomBeer} onChange={ () => this.setState({ isCustomBeer: true }) }/>
                <input disabled={ isLoading } placeholder="custom" onChange={this.setCustomBeer} value={this.state.customBeer}/>
              </StyledLabel>
              <StyledLabel>
                <span>Quantity</span>
                <input
                  disabled={ isLoading }
                  required
                  onChange={this.setQuantity}
                  value={this.state.quantity}
                  type="number"
                  min="1"
                  max="5"/>
              </StyledLabel>
              <button disabled={ isLoading } role="submit">Submit</button>
            </form>
          ) : <div>loading...</div>
        }
        <div><Link to="/results">See Results</Link></div>
        <div><Link to="/beers">Beer List</Link></div>
      </div>
    );
  }
}

const StyledLabel = styled.label`
  display: block
`;

export default withRouter(SubmitForm);
