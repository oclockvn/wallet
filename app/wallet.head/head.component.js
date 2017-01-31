(function() {

    function headController() {
        var self = this;

        self.$onInit = function() {
            console.log('head.$onInit');
        };
    }

    angular.module('app')
        .component('qHead', {
            templateUrl: 'app/wallet.head/head.template.html',
            controller: headController,
        });
})();