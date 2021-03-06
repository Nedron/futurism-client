angular.module('futurism')
    .controller('StoreCtrl', function($scope, shared, me, FutureResource) {
        'use strict';
        
        $scope.futures = shared.futures;
        $scope.me = me;
        
        $scope.iHaveFuture = function(futureId) {
            if(me.stats && me.stats.futures) {
                return me.stats.futures.indexOf(futureId) !== -1;
            }
            else {
                return false;
            }
        };
        
        $scope.buyFuture = function(futureId) {
            if($scope.iHaveFuture(futureId)) {
                return false;
            }
            FutureResource.put({userId: me.user._id, futureId: futureId}, function() {
                me.reload();
            });
        };
    });