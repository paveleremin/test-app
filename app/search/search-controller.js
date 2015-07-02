'use strict';

(function (angular){

    var Ctrl = function ($rootScope, $scope, $filter, localStorageService, items) {

        var ctrl = this;

        ctrl.items = items;
        ctrl.colors = [];
        angular.forEach(items, function(item){
            if (this.indexOf(item.color) != -1) return;
            this.push(item.color);
        }, ctrl.colors);

        ctrl.itemsFilter = function(item){
            if (!ctrl.filter) return true;

            if (ctrl.filter.inStock && !item.inStock) {
                return false;
            }
            if (ctrl.filter.color && ctrl.filter.color != item.color) {
                return false;
            }
            if (ctrl.filter.priceFrom && item.price < ctrl.filter.priceFrom) {
                return false;
            }
            if (ctrl.filter.priceTo && item.price > ctrl.filter.priceTo) {
                return false;
            }
            if (ctrl.filter.issueFrom && item.issue < ctrl.filter.issueFrom) {
                return false;
            }
            if (ctrl.filter.issueTo && item.issue > ctrl.filter.issueTo) {
                return false;
            }

            return true;
        };

        ctrl.addToCart = function(item){
            var items = localStorageService.get('items') || [];
            items.push(item);
            localStorageService.set('items', items);
            $rootScope.$emit('header:cartItems', items.length);
        };

    };

    Ctrl.resolve = {
        /*@ngInject*/
        items: function ($q, $http){
            var deferred = $q.defer();

            $http.get('/search/items.json').success(function (items){
                deferred.resolve(items);
            });

            return deferred.promise;
        }
    };

    // INIT MODULE
    var module = angular.module('testApp.Search', []);

    // INIT CONTROLLER
    module.controller('SearchCtrl', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider){
        $stateProvider.state('search', {
            url: '/search',
            templateUrl: 'search/search.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl',
            isSecure: true
        });
    });

})(angular);