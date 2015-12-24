import _ from 'lodash';

function catalogSearchFilter() {
  return function(items, filter) {
    items = _.filter(items, (item) => {
      if (!!filter.color && item.color !== filter.color.code) {
        return false;
      }

      if (filter.inStockOnly && item.inStock !== true) {
        return false;
      }

      if (filter.dateFrom && item.issueDate < filter.dateFrom) {
        return false;
      }

      if (filter.dateTo && item.issueDate > filter.dateTo) {
        return false;
      }

      if (filter.priceFrom && item.price < filter.priceFrom) {
        return false;
      }

      if (filter.priceTo && item.price > filter.priceTo) {
        return false;
      }

      return true;
    });

    return items;
  };
}

catalogSearchFilter.$inject = [];

export default catalogSearchFilter;
