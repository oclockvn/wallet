(function(window) {

    function feeController($scope, $rootScope) {
        var self = this;
        self.is_editing = false;

        $scope.$on(app.events.quit_edit, function(e, args) {
            if (args.edit === false) {
                self.is_editing = false;
            }
        });

        self.$onInit = function() {
            // console.log('fee.$onInit');
        };

        self.$postLink = function() {
            // console.log('fee.$postLink');
            setTimeout(function() {
                autosize(document.getElementsByTagName('textarea'));
            }, 100);
        };

        self.onClick = function($event) {
            self.is_editing = true;

            var fee_element = $event.target.closest('.fee');
            var ta = fee_element.querySelector('textarea');

            if (ta) {
                setTimeout(function() {
                    ta.focus();
                    autosize.update(ta);
                }, 100);
                
            }
            $rootScope.$broadcast(app.events.edit_fee, { edit: true });
        };

        self.onBlur = function(fee) {
            // fee.note_parsed = marked(fee.note);
            // console.log('note', fee.note_parsed);
        };
    }

    angular.module('app')
        .component('qFee', {
            templateUrl: 'app/wallet.fee/fee.template.html',
            controller: ['$scope', '$rootScope', feeController],
            bindings: {
                fee: '<'
            },
            // require: {
            //     parent: '^feesController'
            // }
        });
})(window);