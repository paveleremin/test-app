'use strict';

(function (angular){

    var Ctrl = function ($rootScope, currentUser, localStorageService){

        var ctrl = this;

        ctrl.isLoggedIn = currentUser.isLoggedIn;

        ctrl.numItems = (localStorageService.get('items') || []).length;
        $rootScope.$on('header:cartItems', function(event, itemsCount){
            ctrl.numItems = itemsCount;
        });

        // Not used this to increase performance
        //ctrl.numItems = function() {
        //    return (localStorageService.get('items') || []).length
        //};

    };

    // INIT MODULE
    var module = angular.module('testApp.Header', []);

    // INIT CONTROLLER
    module.controller('HeaderCtrl', Ctrl);

})(angular);