(function() {

    function summaryController() {
        var self = this;

        self.$onInit = function() {
            console.log('summary.$onInit');
        };
    }

    angular.module('app')
        .component('qSummary', {
            templateUrl: 'app/wallet.summary/sum.template.html',
            controller: summaryController,
        });
})();