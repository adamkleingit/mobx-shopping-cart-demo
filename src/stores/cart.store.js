import { action, observable, computed } from 'mobx';
import Products from './products.store';

export class CartItem {
  @observable productId;
  @observable quantity;

  constructor(data) {
    Object.assign(this, data);
  }

  @action updateQuantity(quantity) {
    this.quantity = quantity;
  }

  @computed get totalPrice() {
    return this.product.price * this.quantity;
  }

  @computed get product() {
    return this.products.getProductById(this.productId);
  }
}

export default class Cart {
  @observable items = [];

  @action addItem(productId, quantity) {
    this.items.push(new CartItem({productId, quantity}));
  }

  @action updateItem(index, quantity) {
    this.items[index].updateQuantity(quantity);
  }

  @action removeItem(index) {
    this.items.splice(index, 1);
  }

  @computed get totalPrice() {
    return this.items.reduce((prev, curr) => prev + curr, 0);
  }
}
