'use strict';

angular.module('testApp.Search')
    .directive('itemRating', function (){

        function linkFn(scope){
            scope.stars = [];

            for (var i = 1; i <= 5; i++) {
                var className = i < scope.item.rating
                    ? 'glyphicon-star'
                    : 'glyphicon-star-empty';
                scope.stars.push(className);
            }
        }

        return {
            restrict: 'A',
            template: '<span ng-repeat="className in stars track by $index" class="glyphicon {{className}}"></span>',
            scope: {
                item: '='
            },
            link: linkFn
        };
    })
;