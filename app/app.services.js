(function () {

    function walletFactory($http, FIREBASE_URI, $firebaseArray) {

        var ref = new Firebase(FIREBASE_URI);
        var fees = $firebaseArray(ref);

        // var getBuildings = function () {
        //     return buildings;
        // };

        // var addBuilding = function (item) {
        //     buildings.$add(item);
        // };

        // var updateBuilding = function (id) {
        //     buildings.$save(id);
        // };

        // var removeBuilding = function (id) {
        //     buildings.$remove(id);
        // };

        // return {
        //   getBuildings: getBuildings,
        //   addBuilding: addBuilding,
        //   updateBuilding: updateBuilding,
        //   removeBuilding: removeBuilding
        // };

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