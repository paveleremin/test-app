'use strict';

(function (angular){

    var Ctrl = function ($filter, $state, localStorageService, hash, currentUser) {

        var ctrl = this;

        ctrl.error = null;

        ctrl.data = {
            email: '',
            password: ''
        };

        ctrl.onSubmit = function(){
            ctrl.error = null;

            var users, user;

            users = localStorageService.get('users') || [];

            user = $filter('filter')(users, {email: ctrl.data.email}, true)[0];
            if (!user || user.password != hash.password(ctrl.data.password)) {
                ctrl.error = "Bad email or password";
                return;
            }

            localStorageService.remove('items');
            currentUser.set({
                email: ctrl.data.email
            });

            $state.transitionTo('search');
        };

    };

    Ctrl.resolve = {
        /*@ngInject*/
        redirect: function (currentUser, $state, $timeout){
            if (currentUser.isLoggedIn()) {
                $timeout(function (){
                    $state.transitionTo('search');
                });
            }
        }
    };

    // INIT MODULE
    var module = angular.module('testApp.Login', []);

    // INIT CONTROLLER
    module.controller('LoginCtrl', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider){
        $stateProvider.state('login', {
            url: '/',
            templateUrl: 'login/login.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);