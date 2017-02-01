(function() {

    function headController($scope, $rootScope) {
        var self = this;

        self.onKeyup = function ($event) {
            console.log('key = ', $event);
            if ($event.keyCode === 13) {

            }
        };
    }

    angular.module('app')
        .component('walletHeader', {
            templateUrl: 'app/wallet-header.template.html',
            controller: ['$scope','$rootScope',headController],
        });
})();