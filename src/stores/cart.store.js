import { action, observable, computed, autorun, toJS } from 'mobx';
import { values, forEach } from 'lodash/fp';
import productsStore from './products.store';

export class CartItem {
  @observable productId;
  @observable quantity;

  constructor(data) {
    Object.assign(this, data);
  }

  @action updateQuantity(quantity) {
    this.quantity = Math.max(1, quantity);
  }

  @computed get totalPrice() {
    return this.product.price * this.quantity;
  }

  @computed get product() {
    return productsStore.getProductById(this.productId);
  }
}

export class Cart {
  @observable items = new Map();

  constructor() {
    if (localStorage.cart) {
      const savedItems = JSON.parse(localStorage.cart);

      forEach((item) => {
        this.items.set(item.productId, new CartItem(item))
      }, savedItems);
    }
    autorun(() => {
      localStorage.cart = JSON.stringify(toJS(this.items));
    });
  }

  @action addItem(productId, quantity) {
    if (this.items.get(productId)) {
      this.items.get(productId).updateQuantity(this.items.get(productId).quantity + 1);
    } else {
      this.items.set(productId, new CartItem({productId, quantity}));
    }
  }

  @action updateItem(productId, quantity) {
    this.items.get(productId).updateQuantity(quantity);
  }

  @action removeItem(productId) {
    this.items.delete(productId);
  }

  @computed get itemsArray() {
    return values(this.items.toJSON());
  }

  @computed get totalPrice() {
    return this.itemsArray.reduce(
      (prev, item) => prev + item.totalPrice,
      0
    );
  }

  @computed get count() {
    return this.itemsArray.length;
  }
}

export default new Cart();
