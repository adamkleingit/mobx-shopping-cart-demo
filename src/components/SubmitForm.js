import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { StyledLink } from './CommonComponents';
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
    return this.state.name && this.chosenBeer();
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
  chosenBeer = () => this.state.isCustomBeer ? this.state.customBeer : this.state.beer

  submit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      localStorage.setItem('happy-hour-saved-state', JSON.stringify(
        omit(['isLoading'], this.state)
      ));
      const formData = {
        name: this.state.name,
        beer: this.chosenBeer(),
        quantity: this.state.quantity,
        sessionId: localStorage.sessionId,
        date: new Date()
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
              <StyledField>
                <StyledLabel>
                  <span>Your Name:</span>
                  <FullText disabled={ isLoading } required onChange={this.setName} value={this.state.name}/>
                </StyledLabel>
              </StyledField>
              <StyledField>
                <StyledLabel>
                  <span>Beer:</span>
                  <input disabled={ isLoading } type="radio" checked={!this.state.isCustomBeer} onChange={ () => this.setState({ isCustomBeer: false }) }/>
                  <select disabled={ isLoading } onChange={this.setBeer} value={this.state.beer}>
                    <option></option>
                    { beers.map(this.renderBeerOption) }
                  </select>
                  <input disabled={ isLoading } type="radio" checked={this.state.isCustomBeer} onChange={ () => this.setState({ isCustomBeer: true }) }/>
                  <input disabled={ isLoading } placeholder="custom" onChange={this.setCustomBeer} value={this.state.customBeer}/>
                </StyledLabel>
              </StyledField>
              <StyledField>
                <StyledLabel>
                  <span>Quantity</span>
                  <FullText
                    disabled={ isLoading }
                    required
                    onChange={this.setQuantity}
                    value={this.state.quantity}
                    type="number"
                    min="1"
                    max="5"/>
                </StyledLabel>
              </StyledField>
              <StyledField>
                <StyledButton disabled={ isLoading || !this.isValid() }>Submit</StyledButton>
              </StyledField>
            </form>
          ) : <div>loading...</div>
        }
        <StyledLink to="/results">See Results</StyledLink>
        <StyledLink to="/beers">Beer List</StyledLink>
      </div>
    );
  }
}

const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  span {
    flex-basis: 100px;
  }
`;

const FullText = styled.input`
  border-radius: 4px;
  line-height: 20px;
  width: 290px;
`;

const StyledField = styled.div`
  input {
    color: black;
  }
  display: block;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  outline: none;
  box-shadow: none;
  background: white;
  cursor: pointer;
  text-align: left;
  font-size: 18px;
  border-radius: 4px;
  color: black;
`;

export default withRouter(SubmitForm);
