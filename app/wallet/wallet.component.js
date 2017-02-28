(function (window) {

    function walletController($timeout, $firebaseArray, FilteredArray, $scope) {
        var self = this;

        self.$onInit = function () {
            var ref = firebase.database().ref();
            self.fees = $firebaseArray(ref);

            self.checked_fees = [];
            self.total_fee = 0;
            self.loading = true;
            self.currentPeriod = new Date();
            self.data = {
                keyword: ''
            };

            self.fees.$loaded(function () {
                self.loading = false;
                console.log('loaded');
            });

            self.fees.$watch(function (e) {
                console.log('watch %o', e);
                if (e.event === 'child_added' || e.event === 'child_removed') {
                    self.loading = false;
                }

                self.fees = self.fees.sortBy(function (o) {
                    return new Date(o.time)
                }).reverse();
                calcTotalFee();
            });
        };

        self.onKeyup = function ($event) {

            var text = self.data.keyword || '';
            if (text !== '' && $event.keyCode === 13) {

                if (/^(.{1,255})([+-]\d{1,12})$/g.test(text) === false) {
                    return;
                }

                self.loading = true;

                var p_matches = /^(.{1,255})([+-]\d{1,12})$/g.exec(text);
                var note = p_matches[1].trim();
                var money = Number(p_matches[2]);

                if (note[0] === window.app.start_search) {
                    note = note.substr(1, note.length);
                }

                self.fees.$add({
                    checked: false,
                    time: new Date().getTime(),
                    note: note,
                    money: money
                });

                self.data.keyword = '';
            }
        };

        self.onClearSearch = function () {
            self.data.keyword = '';
        }

        self.checkChange = function (fee) {
            var idx = self.checked_fees.indexOf(fee);
            if (idx >= 0) {
                self.checked = false;
                self.checked_fees.splice(idx, 1);
            } else {
                fee.checked = true;
                self.checked_fees.push(fee);
            }
        };

        self.$postLink = function () {

        };

        self.$onChanges = function (changedObject) {

        };

        self.$doCheck = function () {

        };

        self.uncheckAll = function () {
            self.checked_fees = [];
            self.fees.forEach(function (fee, i) {

                fee.checked = false;
            });
        };

        self.update = function (fee) {
            self.loading = true;

            self.fees.$save(fee).then(function (ref) {
                self.loading = false; // whatever result is
            });
        };

        self.deleteSelected = function () {
            if (self.checked_fees.length === 0) {
                return;
            }

            self.checked_fees.forEach(function (fee) {

                self.fees.$remove(fee).then(function (removed) {
                    if (removed) {
                        var idx = self.checked_fees.indexOf(fee);
                        if (idx > -1) {
                            self.checked_fees.splice(idx, 1);
                        }
                    }
                });
            });
        };

        function calcTotalFee() {

            self.total_fee = self.fees.reduce(function (prev, cur) {
                return prev + cur.money;
            }, 0);
        }
    }

    angular.module('app')
        .component('wallet', {
            templateUrl: 'app/wallet.template.html',
            controller: ['$timeout', '$firebaseArray', 'FilteredArray', '$scope', walletController],
            transclude: true,
        });
})(window);