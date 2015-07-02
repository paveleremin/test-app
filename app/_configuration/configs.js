'use strict';

angular.module('testApp.configs', [])
    .config(function ($locationProvider){
        //html5Mode required <base> tag
		$locationProvider.html5Mode(true);
	})
    .config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/login');
    })
;
