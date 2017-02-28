(function () {

    function loginController() {
        var self = this;
    }

    angular.module('app')
        .component('login', {
            templateUrl: 'app/auth/login.template.html',
            controller: [loginController],
        });
})();