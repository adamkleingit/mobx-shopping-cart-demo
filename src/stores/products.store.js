import { observable } from 'mobx';

export class ProductsStore {
  @observable items = {
    '1': {
      id: '1',
      title: 'Shoe',
      image: 'https://s7d2.scene7.com/is/image/dkscdn/17ADIWCLDFMQTRCRCLFS_Black_White_is/',
      price: 50
    },
    '2': {
      id: '2',
      title: 'Shirt',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD_bACbFvxdZljEklyHhpAtQLvURl_vj3dUyvqb3A9zRA8vWF33w',
      price: 20
    },
    '3': {
      id: '3',
      title: 'Dress',
      image: 'https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2017/06/19/goods-img/1497845431556201185.jpg',
      price: 120
    },
    '4': {
      id: '4',
      title: 'Bag',
      image: 'https://5.imimg.com/data5/JL/SW/MY-1914426/college-bag-500x500.jpg',
      price: 165
    }
  }

  getProductById(id) {
    return this.items[id];
  }
}

export default new ProductsStore();
