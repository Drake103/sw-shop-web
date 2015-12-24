class Rating {
  constructor() {
    this.restrict = 'A';
    this.templateUrl = '/shared/rating/rating.view.html';
    this.scope = {
      rating: '=rating',
    };
  }

  link(scope, element, attrs, ctrl) {

  }

  static directiveFactory() {
    Rating.instance = new Rating();
    return Rating.instance;
  }
}

Rating.directiveFactory.$inject = [];

export default Rating;
