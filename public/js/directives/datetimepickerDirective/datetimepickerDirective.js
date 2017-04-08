angular.module('cantina-asser', [])
    .directive('dateTimePicker', function ($rootScope) {

        var directive = {};

        directive.require = '?ngModel';
        directive.restrict = 'AE';

        directive.scope = {
            pick12HourFormat: '@',
            language: '@',
            useCurrent: '@',
            location: '@'
        };

        directive.link = function (scope, elem, attrs) {
            elem.datetimepicker({
                pick12HourFormat: scope.pick12HourFormat,
                language: scope.language,
                useCurrent: scope.useCurrent
            })

            //Local event change
            elem.on('blur', function () {

                console.info('this', this);
                console.info('scope', scope);
                console.info('attrs', attrs);


                /*// returns moments.js format object
                scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                // Global change propagation
                $rootScope.$broadcast("emit:dateTimePicker", {
                    location: scope.location,
                    action: 'changed',
                    dateTime: scope.dateTime,
                    example: scope.useCurrent
                });
                scope.$apply();*/
            })
        };

        return directive;

    });