xopen
=====

實驗性質的半業務邏輯綁定另開視窗

config schema
-------------
    // before load xopen.js
    var xopen = {
        name: 'window_name',
        url: 'http://user.window.url',
        params: {a: 1, b: 2},
        window: {
            width: 500,
            height: 300,
            scrollbars: 0
        }
    }
    
    
bower
-----
    bower install colin-xopen
