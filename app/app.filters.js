(function (window) {

    function clean(num) {
        return num !== undefined;
    }

    function isNumber(num) {
        return window.app.isNumber(num);
    }

    angular.module('app')
        .filter('search', function () {
            return function (source, keyword) {

                if (keyword == null || keyword === '') {
                    return source;
                }

                keyword = keyword.toLowerCase();

                if (keyword[0] === '-' || keyword[0] === '+') {
                    return source
                        .filter(function (fee) {
                            var k = keyword.slice(1, keyword.length);
                            var negative = keyword[0] === '-' ? true : false;

                            return (negative ? fee.money < 0 : fee.money >= 0) && String(fee.money).indexOf(k) > -1;;
                        })
                        .filter(clean);
                }

                if (isNumber(keyword)) {
                    return source
                        .filter(function (fee) {
                            return String(fee.money).indexOf(keyword) > -1;
                        })
                        .filter(clean);
                }

                return source
                    .filter(function (fee) {
                        return fee.note.toLowerCase().indexOf(keyword) > -1;
                    })
                    .filter(clean);
            }
        })
})(window);