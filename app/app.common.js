(function (document, window) {
    window.app = {
        events: {
            edit_fee: 'edit_fee',
            quit_edit: 'quit_edit',
        },
        isNumber: function (numb) {
            var num = Number(numb);
            return num !== null && angular.isNumber(num) && isFinite(num);
        },
        pattern: /^(.{1,1000})([+-]\d{1,12})$/g,
        start_search: '?'
    };

    if (window.Element && !Element.prototype.closest) {
        Element.prototype.closest =
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i,
                    el = this;
                do {
                    i = matches.length;
                    while (--i >= 0 && matches.item(i) !== el) { };
                } while ((i < 0) && (el = el.parentElement));
                return el;
            };
    }
})(document, window);