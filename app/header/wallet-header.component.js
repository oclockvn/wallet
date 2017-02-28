(function() {

    function headController($scope, $rootScope) {
        var self = this;

        // self.keyword = '';

        self.onKeyup = function ($event) {
            self.parent.onKeyup($event);
        };

        self.$onInit = function() {

        };

        self.$onChanges = function(changedObject) {
            console.log('header.$onChanges',changedObject);
        };

        self.$doCheck = function() {
            // console.log('checking on head');
        };
    }

    angular.module('app')
        .component('walletHeader', {
            templateUrl: 'app/wallet-header.template.html',
            controller: ['$scope','$rootScope',headController],
            require: {
                parent: '^^wallet'
            },
            bindings: {
                data: '<',
                // onKeyup: '&',
                onClearSearch: '&',
                uncheckAll: '&',
                deleteSelected: '&',
            }
        });
})();