(function(factory){

    if ( ! self.xopen || ! self.xopen.init) {
        self.xopen = factory(self.xopen || {});
    }

})(function(config){ 'use strict';

    var obj = {},
        _toString = obj.toString,
        default_config = {
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
        merge = function(o){
            var args = arguments,
                oo;
            for (var i = 1, L = args.length; i < L; ++i) {
                oo = args[i];
                oo && each(oo, function(k, v){
                    var type2 = typeof v,
                        type1 = typeof o[k];
                    if ('object' == type2) {
                        if (type1 == 'undefined') {
                            o[k] = {};
                        }
                        merge(o[k], oo[k]);
                    } else {
                        o[k] = oo[k];
                    }
                });
            }

            return o;
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

    return {
        init: true,

        config: function(conf){
            return default_config = merge(default_config, conf);
        },
        compile: function(other){

            var conf = merge({}, default_config, config, other),
                name = conf.name,
                url = conf.url,
                query_string = build_query(conf.params || {}),
                window_setting = build_setting(conf.window || {});

            if ( ! url) {
                throw new Error('please set url');
            }

            if (query_string) {
                url += /\?.+/.test(url) ? '&'+query_string : '?'+query_string;
            }

            return [url, name, window_setting];
        },
        open: function(other){
            return window.open.apply(window, this.compile(other));
        }
    };
});
