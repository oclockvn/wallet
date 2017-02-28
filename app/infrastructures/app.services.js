(function () {

    function walletFactory($http, FIREBASE_URI, $firebaseArray) {

        var ref = new Firebase(FIREBASE_URI);
        var fees = $firebaseArray(ref);
        var self = {};

        self.fees = fees;

        self.getFeesByMonth = function () {
            // return $http.get('/wallet/getbymonth');
            return fees;
        };

        self.createFee = function (fee) {
            // return $http.post('/wallet/createfee', angular.toJson(fee));
            fees.$add(fee);
        }

        return self;
    }

    angular.module('app')
        .factory('walletFactory', ['$http', 'FIREBASE_URI', '$firebaseArray', walletFactory]);
})();