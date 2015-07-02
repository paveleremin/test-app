'use strict';

angular.module('testApp.currentUser', [])
    .service('currentUser', function ($q, $cookies){

        var self = {
            set: function(newData){
                $cookies.put('user', newData);
            },
            get: function(){
                return $cookies.get('user');
            },
            update: function(key, value){
                if (angular.isUndefined(value)) {
                    self.set(angular.extend(self.get(), key));
                    return;
                }
                var newData = {};
                newData[key] = value;
                self.set(angular.extend(self.get(), newData));
            },
            logout: function (){
                $cookies.remove('user');
            },

            isLoggedIn: function (){
                return Boolean(self.get());
            }
        };

        return self;
    })
;