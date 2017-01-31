(function () {

    function feesController($timeout) {
        var self = this;

        self.fees = [];

        self.$onInit = function () {
            console.log('fees.$onInit');
            for (var i = 0; i < 20; i++) {
                (function (ii) {
                    $timeout(function () {
                        var note = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat';
                        self.fees.push({
                            checked: false,
                            time: new Date(),
                            note: note,
                            money: 2000000,
                            // note_parsed: marked(note)
                        });
                    }, ii * 150);
                })(i);
            }
        };

        self.$postLink = function () {
            console.log('$postLink');
            // autosize(document.getElementsByTagName('textarea'));
        }
    }

    // feesController.$inject = ['$scope', '$rootScope'];

    angular.module('app')
        .component('qFees', {
            templateUrl: 'app/wallet.fees/fees.template.html',
            controller: ['$timeout', feesController],
        });
})();