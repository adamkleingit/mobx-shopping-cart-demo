import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import liquorStore from './stores/liquor.store';
import beerStore from './stores/beer.store';
import SubmitForm from './components/SubmitForm';
import Results from './components/Results';
import BeerList from './components/BeerList';

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
        <Router history={createBrowserHistory({})}>{renderRoutes(routes)}</Router>
      </Provider>
    );
  }
}

export default App;
