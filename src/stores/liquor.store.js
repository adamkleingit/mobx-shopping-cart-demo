import { observable, action, computed } from 'mobx';
import { filter, sortBy, reverse, uniqBy, flow } from 'lodash/fp';
import api from '../utils/api.utils';

const THREE_DAYS = 1000 * 3600 * 24 * 3;

export class LiquorStore {
  @observable requests;

  @action setRequests(requests) {
    this.requests = requests;
  }

  @computed get todays() {
    const today = new Date();

    return flow([
      filter((request) => {
        return today - new Date(request.date) < THREE_DAYS;
      }),
      sortBy('date'),
      reverse,
      uniqBy('sessionId')
    ])(this.requests);
  }

  fetchRequests(id) {
    api.getRequests()
      .then((response) => response.json())
      .then((requests) => this.setRequests(requests))
  }
}

export default new LiquorStore();
