'use strict';

angular.module('testApp', [
    // vendors first
    'ngCookies',
    'ui.router',
    'LocalStorageModule',

    // configuration modules
    'testApp.configs',
    'testApp.services',
    'testApp.currentUser',

    // application modules
    'testApp.Header',
    'testApp.Login',
    'testApp.Signup',
    'testApp.Search'
]).run(function ($rootScope, $state, $timeout, currentUser){
    $rootScope.$on('$stateChangeStart', function (event, toState){
        if (toState.isSecure && !currentUser.isLoggedIn()) {
            $state.transitionTo('login');
            event.preventDefault();
        }
    });
})
;