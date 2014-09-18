xopen
=====

實驗性質的半業務邏輯綁定另開視窗

bower
-----
    bower install --save colin-xopen#~1

    // or

    bower install --save rde-xopen#~1

init schema
-------------
    // before load xopen.js
    // 所有設定值皆可省略,但url至少需在 1. init schema 2. api open 提供
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

API
---
    // options 結構同上
    xopen.config([options])
    xopen.open([options])

html
----
方法1

    <script src="xopen.js"></script>
    <button onclick="xopen.open()">click me</button>

方法2

    <button id="i-am-a-button">click me</button>
    <script src="xopen.js"></script>
    <script>
        document.getElementById('i-am-a-button').addEventListener('click', function(){
            xopen.open();
        });
    </script>

