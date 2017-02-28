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

                if (keyword == null || keyword === '' || keyword[0] !== window.app.start_search) {
                    return source;
                }

                keyword = keyword.toLowerCase().substr(1, keyword.length);

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
        .factory('FilteredArray', function ($firebaseArray) {
            function FilteredArray(ref, filterFn) {
                this.filterFn = filterFn;
                return $firebaseArray.call(this, ref);
            }
            FilteredArray.prototype.$$added = function (snap) {
                var rec = $firebaseArray.prototype.$$added.call(this, snap);
                console.log('snap = %o, rec = %o', snap, rec);
                if (!this.filterFn || this.filterFn(rec)) {
                    return rec;
                }
            };
            return $firebaseArray.$extend(FilteredArray);
        });

})(window);