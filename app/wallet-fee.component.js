(function(window) {

    function feeController($scope, $rootScope) {
        var self = this;
    }

    angular.module('app')
        .component('walletFee', {
            templateUrl: 'app/wallet-fee.template.html',
            controller: ['$scope', '$rootScope', feeController],
            bindings: {
                fee: '<',
                checkChange: '&',
                onLostFocus: '&'
            },
            transclude: true,
            require: {
                parent: '^^wallet'
            }
        });
})(window);