(function(factory){

    if ( ! self.xopen || ! self.xopen.init) {
        self.xopen = factory();
    }

})(function(){ 'use strict';

    var obj = {},
        _toString = obj.toString,
        config = {
            name: 'opener_'+(new Date).getTime(),
            url: null,
            params: {},
            window: {
                width: 900,
                height: 510,
                fullscreen: 0,
                location: 0,
                menubar: 0,
                resizable: 0,
                scrollbars: 0,
                status: 0
            },
            selector: null,
            event: 'click'
        },
        isArray = function(o){
            return o && _toString.call(o).match(/array/i);
        },
        each = function(o, callback){
            var i = 0,
                length = o.length;
            if (isArray(o)) {
                for ( ; i < length; ++i) {
                    if (false === callback.call(o[i], i, o[i])) {
                        break;
                    }
                }
            } else {
                for (i in o) {
                    if (false === callback.call(o[i], i, o[i])) {
                        break;
                    }
                }
            }
        },
        merge = function(o1, o2){
            each(o2, function(k, v){
                var type2 = typeof v,
                    type1 = typeof o1[k];
                if ('object' == type2) {
                    if (type1 == 'undefined') {
                        o1[k] = {};
                    }
                    merge(o1[k], o2[k]);
                } else {
                    o1[k] = o2[k];
                }
            });
        },
        join = function(o, s1, s2){
            var collector = [];
            each(o, function(k, v){
                collector.push(k+s1+v);
            });
            return collector.join(s2);
        },
        build_query = function(o){
            return join(o, '=', '&');
        },
        build_setting = function(o){
            return join(o, '=', ', ');
        };

    merge(config, self.xopen || {});

    return {
        init: true,

        config: function(name, value){
            if (typeof value != 'undefined') {
                config[name] = value;
            }

            return config[name];
        },

        compile: function(){
            var name = this.config('name'),
                url = this.config('url'),
                query_string = build_query(this.config('params') || {}),
                window_setting = build_setting(this.config('window') || {});

            if ( ! url) {
                throw new Error('please set url');
            }

            url += /\?.+/.test(url) ? '&'+query_string : '?'+query_string;

            return [url, name, window_setting];
        },
        open: function(){
            return window.open.apply(window, this.compile());
        }
    };
});
