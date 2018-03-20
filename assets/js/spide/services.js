(function(angular){
    'use strict';

/* Register the interceptor as a service, intercepts ALL angular ajax http calls */
function myHttpInterceptor($q, $rootScope) {
    var loadingCount = 0;
        return {
            request: function (config) {
                if(++loadingCount === 1) $rootScope.$broadcast('loading:progress');
                return config || $q.when(config);
            },

            response: function (response) {
                if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
                return response || $q.when(response);
            },

            responseError: function (response) {
                if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
                return $q.reject(response);
            }
        };

     };

function spIDEServiceDef($http){
    var spIDEServiceObj = {};

        spIDEServiceObj.runCode = function(spCodeEditor){
            return $http({
                url:"/compile",
                method:"post",
                data:spCodeEditor
            }).then(function(returnData){
                return returnData;
            },function(returnData){
                return returnData;
            });
        }


    return spIDEServiceObj;

}



/**
 *
 * Pass all functions into module
 */
angular.module('spide')
       .factory('myHttpInterceptor',['$q', '$rootScope',myHttpInterceptor])
       .factory('spIDEService',['$http', spIDEServiceDef])
})(window.angular);