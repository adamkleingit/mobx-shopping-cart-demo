import { action, observable, computed } from 'mobx';
import productsStore from './products.store';

export class UI {
  @observable isCartOpen = false;
  @observable filter = '';

  @action openCart() {
    this.isCartOpen = true
  }

  @action toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  @action setFilter(filter) {
    this.filter = filter;
  }

  @computed get filteredItems() {
    return Object.keys(productsStore.items)
      .map((productId) => productsStore.getProductById(productId))
      .filter(({ title }) => title.toLowerCase().includes(this.filter.toLowerCase()));
  }
}

export default new UI();
