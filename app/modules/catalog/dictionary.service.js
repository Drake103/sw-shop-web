import _ from 'lodash';

class DictionaryService {
  constructor($q, $resource) {
    this.$q = $q;
    this.$resource = $resource;
  }

  getColors() {
    let resource = this.$resource('./data/colors.json', {}, {
      get: {
        method:'GET',
      },
    });
    return resource.get().$promise;
  }

  static createInstance($q, $resource) {
    DictionaryService.instance = new DictionaryService($q, $resource);
    return DictionaryService.instance;
  }
}

DictionaryService.createInstance.$inject = ['$q', '$resource'];

export default DictionaryService;
