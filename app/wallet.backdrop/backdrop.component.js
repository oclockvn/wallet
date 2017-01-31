(function(window) {

    function backdropController($scope, $rootScope) {
        var self = this;
        self.is_editing = false;

        $scope.$on(app.events.edit_fee, function(e, args) {
            if (args.edit) {
                self.is_editing = true;
            }
        });

        self.onClick = function() {
            $rootScope.$broadcast(app.events.quit_edit, { edit: false });
            self.is_editing = false;
        }
    }

    angular.module('app')
        .component('qBackdrop', {
            template: '<div class="backdrop" ng-class="{ in: $ctrl.is_editing }" ng-click="$ctrl.onClick()"></div>',
            controller: ['$scope', '$rootScope', backdropController],
        });
})(window);