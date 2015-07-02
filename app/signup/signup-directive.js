'use strict';

angular.module('testApp.Signup')
    .directive('ngMatch', function ($parse){
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl){
                function getMatchValue(){
                    var match = $parse(attrs.ngMatch)(scope);
                    if (angular.isObject(match) && match.hasOwnProperty('$viewValue')) {
                        match = match.$viewValue;
                    }
                    return match;
                }

                scope.$watch(getMatchValue, function (){
                    ctrl.$validate();
                });
                ctrl.$validators.match = function (){
                    var matchValue = getMatchValue();
                    if (angular.isUndefined(matchValue)) return true;
                    return ctrl.$viewValue === matchValue;
                };
            }
        };
    })
    .directive('ngFocusIf', function ($parse, $timeout){
        return {
            restrict: 'A',
            link: function (scope, element, attrs){
                if ($parse(attrs.ngFocusIf)(scope)) {
                    if (!element[0].focus) return;
                    $timeout(function (){
                        element[0].focus();
                    }, 200);
                }
            }
        };
    })
;