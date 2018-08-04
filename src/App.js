import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'mobx-react';
import liquorStore from './stores/liquor.store';
import beerStore from './stores/beer.store';
import SubmitForm from './components/SubmitForm';
import Results from './components/Results';
import BeerList from './components/BeerList';
import styled from 'styled-components';
import './App.css';

localStorage.sessionId = localStorage.sessionId || Math.random()*100000000000000000;

const routes = [
  {
    path: '/',
    exact: true,
    component: SubmitForm
  },
  {
    path: '/results',
    exact: true,
    component: Results
  },
  {
    path: '/beers',
    exact: true,
    component: BeerList
  }
];

class App extends Component {
  render() {
    return (
      <Provider { ...{liquorStore, beerStore} }>
        <div>
          <img src="500-logo.png" width={250} alt="logo"/>
          <StyledContainer>
            <HashRouter>{renderRoutes(routes)}</HashRouter>
          </StyledContainer>
        </div>
      </Provider>
    );
  }
}

const StyledContainer = styled.div`
  padding: 15px;
`;

export default App;
