'use strict';

(function (angular){

    var Ctrl = function ($state, currentUser){

        currentUser.logout();
        $state.transitionTo('login');

    };

    // INIT ROUTE
    angular.module('testApp.Login')
        .config(function ($stateProvider){
            $stateProvider.state('logout', {
                url: '/logout',
                controller: Ctrl,
                isSecure: true
            });
        });

})(angular);