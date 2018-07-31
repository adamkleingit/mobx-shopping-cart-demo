import { observable, action } from 'mobx';
import api from '../utils/api.utils';

export class LiquorStore {
  @observable requests;

  @action setRequests(requests) {
    this.requests = requests;
  }

  fetchRequests(id) {
    api.getRequests()
      .then((response) => response.json())
      .then((requests) => this.setRequests(requests))
  }
}

export default new LiquorStore();
