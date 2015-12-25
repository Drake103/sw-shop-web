class Rating {
  constructor() {
    this.restrict = 'A';
    this.templateUrl = '/shared/rating/rating.view.html';
    this.scope = {
      rating: '=ratingValue',
    };
  }

  link(scope, element, attrs, ctrl) {
    const MAX_RATING = 5;
    const MIN_RATING = 0;

    let rating = Math.min(scope.rating, MAX_RATING);
    rating = Math.max(rating, MIN_RATING);
    let fullStars = Math.floor(rating);
    let hasHalfStars = rating != fullStars;
    let emptyStars = Math.floor(MAX_RATING - rating);

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push({type: 'full'});
    }

    if (hasHalfStars) {
      stars.push({type: 'half'});
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push({type: 'empty'});
    }

    scope.stars = stars;
  }

  static directiveFactory() {
    Rating.instance = new Rating();
    return Rating.instance;
  }
}

Rating.directiveFactory.$inject = [];

export default Rating;
