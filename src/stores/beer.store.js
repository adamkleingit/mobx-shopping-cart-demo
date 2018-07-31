import { observable, action } from 'mobx';
import api from '../utils/api.utils';

class Beer {
  id;
  @observable title;

  constructor(beer) {
    Object.assign(this, beer);
  }

  @action setTitle(title) {
    this.title = title;
  }

  update(title) {
    this.setTitle(title);
    api.updateBeer(this);
  }
}

export class BeerStore {
  @observable beers;

  @action setBeers(beers) {
    this.beers = beers.map((beer) => new Beer(beer));
  }

  fetchBeers(id) {
    api.getBeers()
      .then((response) => response.json())
      .then((beers) => this.setBeers(beers))
  }

  addBeer() {
    const newBeer = new Beer({ title: '', id: Math.random()*100000000000000000 });
    this.beers.push(newBeer);
    api.createBeer(newBeer);
  }

  removeBeer(id) {
    this.beers = this.beers.filter(beer => beer.id !== id);
    api.removeBeer(id);
  }
}

export default new BeerStore();
