import { action, observable } from 'mobx';

export default class UI {
  @observable isCartOpen = false;

  @action toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
