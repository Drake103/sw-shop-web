import DatepickerController from './datepicker.controller';
import config from 'config';

class Datepicker {
  constructor() {
    this.restrict = 'A';
    this.templateUrl = './shared/datepicker/datepicker.view.html';
    this.controller = DatepickerController;
    this.scope = {
      dt: '=dateValue',
    };
  }

  link(scope, element, attrs, ctrl) {

    scope.today = () => scope.dt = new Date().getDate();

    scope.clear = () => scope.dt = null;

    scope.open = function($event) {
      scope.status.opened = true;
    };

    scope.setDate = function(year, month, day) {
      scope.dt = new Date(year, month, day);
    };

    scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 0,
    };

    scope.format = config.dateFormat;

    scope.status = {
      opened: false,
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    scope.events =
      [
        {
          date: tomorrow,
          status: 'full',
        },
        {
          date: afterTomorrow,
          status: 'partially',
        },
      ];

    scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < scope.events.length; i++) {
          var currentDay = new Date(scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };
  }

  static directiveFactory() {
    Datepicker.instance = new Datepicker();
    return Datepicker.instance;
  }
}

Datepicker.directiveFactory.$inject = [];

export default Datepicker;
