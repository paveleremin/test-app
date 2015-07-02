'use strict';

angular.module('testApp.services', [])
    // copied from
    // http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery?answertab=votes#tab-top
    .service('hash', function (){
        function hashPassword(str){
            var hash = 0, i, chr, len;
            if (!str.length) return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5)-hash)+chr; // jshint ignore:line
                // Convert to 32bit integer
                hash |= 0; // jshint ignore:line
            }
            return hash;
        }

        return {
            password: hashPassword
        };
	})
;
