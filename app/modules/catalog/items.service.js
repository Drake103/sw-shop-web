import _ from 'lodash';

class ItemsService {
  constructor($q, $resource) {
    this.$q = $q;
    this.$resource = $resource;
  }

  _parseResponseDates(response) {
    let items = response.data.items;
    _.forEach(items, i => i.issueDate = new Date(i.issueDate * 1000));

    return response;
  }

  getItems() {
    let resource = this.$resource('./data/items.json', {}, {
      get: {
        method:'GET',
        interceptor: {response: this._parseResponseDates},
      },
    });
    return resource.get().$promise;
  }

  static createInstance($q, $resource) {
    ItemsService.instance = new ItemsService($q, $resource);
    return ItemsService.instance;
  }
}

ItemsService.createInstance.$inject = ['$q', '$resource'];

export default ItemsService;
