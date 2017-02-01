(function (window) {

    function walletController($timeout) {
        var self = this;

        self.$onInit = function () {

            self.fees = [];
            self.total_fee = 0;
            self.data = {
                keyword: ''
            };

            for (var i = 0; i < 10; i++) {
                (function (ii) {
                    $timeout(function () {
                        var money = Math.floor(Math.random() * 20000000) + 1000000;
                        var note = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat';
                        if (ii % 2 == 0) {
                            note = 'Odd Lorem ipsum dolor sit amet, consectetur adipiscing elit';
                            money = money * -1;
                        }
                        
                        self.fees.push({
                            checked: false,
                            time: new Date(),
                            note: ii + ' ' + note,
                            money: money,
                        });

                        calcTotalFee();
                    }, ii * 100);
                })(i);
            }
        };

        self.onKeyup = function ($event) {
            var text = self.data.keyword || '';
            if (text !== '' && $event.keyCode === 13) {

                // var pattern = /^(.{1,1000})([+-]\d{1,12})$/g;

                if (/^(.{1,1000})([+-]\d{1,12})$/g.test(text) === false) {
                    return;
                }

                var p_matches = /^(.{1,1000})([+-]\d{1,12})$/g.exec(text);
                var note = p_matches[1].trim();
                var money = Number(p_matches[2]);
                
                self.fees.unshift({
                    checked: false,
                    time: new Date(),
                    note: note,
                    money: money
                });

                calcTotalFee();
                self.data.keyword = '';
            }
        };

        self.onClearSearch = function() {
            self.data.keyword = '';
        }

        self.$postLink = function () {
            // console.log('$postLink');
        }

        self.$onChanges = function(changedObject) {
            // console.log('wallet.$onChanges',changedObject);
        };

        self.$doCheck = function() {
            // console.log('checking');
        };

        function calcTotalFee() {
            self.total_fee = self.fees.map(function(e, i){
                return e.money;
            }).reduce(function(a, b) {
                return a + b;
            }, 0);
        }
    }

    angular.module('app')
        .component('wallet', {
            templateUrl: 'app/wallet.template.html',
            controller: ['$timeout', walletController],
            transclude: true,
        });
})(window);