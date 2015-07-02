'use strict';

(function (angular){

    var Ctrl = function ($filter, $state, localStorageService, hash, currentUser){

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
            if (user) {
                ctrl.error = "Email "+ctrl.data.email+" already in use";
                return;
            }

            users.push({
                email: ctrl.data.email,
                password: hash.password(ctrl.data.password)
            });
            localStorageService.add('users', users);

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
                $timeout(function(){
                    $state.transitionTo('search');
                });
            }
        }
    };

    // INIT MODULE
    var module = angular.module('testApp.Signup', []);

    // INIT CONTROLLER
    module.controller('SignupCtrl', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider){
        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'signup/signup.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);