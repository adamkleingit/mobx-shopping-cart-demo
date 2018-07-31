const BASE_URL = 'http://localhost:8080';

export default {
  getRequests() {
    return fetch(BASE_URL + '/requests');
  },
  createRequest(request) {
    return fetch(BASE_URL + '/requests/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
  },
  getBeers() {
    return fetch(BASE_URL + '/beers');
  },
  updateBeer(beer) {
    return fetch(BASE_URL + '/beers/' + beer.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: beer.title, id: beer.id })
    });
  },
  createBeer(beer) {
    return fetch(BASE_URL + '/beers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: beer.title, id: beer.id })
    });
  },
  removeBeer(id) {
    return fetch(BASE_URL + '/beers/' + id, {
      method: 'DELETE'
    });
  }
}