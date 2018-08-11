import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { omit } from 'lodash/fp';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { StyledLink } from './CommonComponents';
import api from '../utils/api.utils';

const common = {
  width: 200,
  marginRight: 20
};

const styles = {
  common,
  greyedOut: {
    ...common,
    opacity: 0.3
  }
}

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

  renderForm() {
    const { beers } = this.props.beerStore;
    const { isLoading } = this.state;

    return (
      <StyledForm onSubmit={ this.submit }>
        <FormGroup>
          <TextField
            margin="normal"
            label="Your Name"
            type="text"
            disabled={ isLoading }
            required
            onChange={this.setName}
            value={this.state.name}/>
        </FormGroup>
        <FormGroup row={ true }>
          <TextField
            margin="normal"
            label="Your Beer"
            select={ true }
            disabled={ isLoading }
            classes={ this.state.isCustomBeer ? { root: this.props.classes.greyedOut } : { root: this.props.classes.common } }
            onChange={this.setBeer}
            value={this.state.beer}>
            { beers.map(this.renderBeerOption) }
          </TextField>
          <TextField
            label="Custom"
            margin="normal"
            disabled={ isLoading }
            type="text"
            classes={ this.state.isCustomBeer ? { root: this.props.classes.common } : { root: this.props.classes.greyedOut } }
            onChange={this.setCustomBeer}
            value={this.state.customBeer}/>
        </FormGroup>
        <FormGroup>
          <TextField
            label="Quantity"
            margin="normal"
            disabled={ isLoading }
            required
            onChange={this.setQuantity}
            value={this.state.quantity}
            type="number"
            min="1"
            max="5"/>
        </FormGroup>

        <Button disabled={ isLoading || !this.isValid() } color="secondary" type="submit" variant="raised">Submit</Button>
      </StyledForm>
    );

    return (
      <form onSubmit={ this.submit }>
        <StyledField>
          <StyledLabel
            label="Your Name"
            control={
                  <FullText disabled={ isLoading } required onChange={this.setName} value={this.state.name}/>
            }/>
              </StyledField>
              <StyledField>
                  <input disabled={ isLoading } type="radio" checked={!this.state.isCustomBeer} onChange={ () => this.setState({ isCustomBeer: false }) }/>
          <StyledLabel
            label="Beer"
            control={
                  <select disabled={ isLoading } onChange={this.setBeer} value={this.state.beer}>
                    <option></option>
                    { beers.map(this.renderBeerOption) }
                  </select>
            }
          />
                  <input disabled={ isLoading } type="radio" checked={this.state.isCustomBeer} onChange={ () => this.setState({ isCustomBeer: true }) }/>
                  <input disabled={ isLoading } placeholder="custom" onChange={this.setCustomBeer} value={this.state.customBeer}/>
              </StyledField>
              <StyledField>
          <StyledLabel
            label="Quantit"
            control={
                  <FullText
                    disabled={ isLoading }
                    required
                    onChange={this.setQuantity}
                    value={this.state.quantity}
                    type="number"
                    min="1"
                    max="5"/>
            }>
                </StyledLabel>
              </StyledField>
              <StyledField>
                <StyledButton disabled={ isLoading || !this.isValid() }>Submit</StyledButton>
              </StyledField>
            </form>
    );
  
        }
  render() {
    const { beers } = this.props.beerStore;
    const { isLoading } = this.state;

    return (
      <div>
        { beers ? this.renderForm() : <div>loading...</div> }
        <StyledLink to="/results">See Results</StyledLink>
        <StyledLink to="/beers">Beer List</StyledLink>
      </div>
    );
  }
}

const StyledForm = styled.form`
  width: 600px;
`;

const StyledLabel = styled(FormLabel)`
  display: flex;
  flex-direction: row;
  span {
    flex-basis: 100px;
  }
`;

const FullText = styled(Input)`
  border-radius: 4px;
  line-height: 20px;
  width: 290px;
`;

const StyledField = styled(FormGroup)`
  input {
    color: black;
  }
  display: block;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  color: white;
  border-radius: 4px;
  background: red;
  text-decoration: none;
  width: 160px;
  height: 40px;
`;

export default withStyles(styles)(withRouter(SubmitForm));
