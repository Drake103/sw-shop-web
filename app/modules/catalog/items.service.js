import _ from 'lodash';

class ItemsService {
  constructor($q, $resource) {
    this.$q = $q;
    this.$resource = $resource;
  }

  static createInstance($q, $resource) {
    ItemsService.instance = new ItemsService($q, $resource);
    return ItemsService.instance;
  }
}

ItemsService.createInstance.$inject = ['$q', '$resource'];

export default ItemsService;
