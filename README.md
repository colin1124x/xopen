xopen
=====

實驗性質的半業務邏輯綁定另開視窗

bower
-----
    bower install colin-xopen

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

html
----
### 方法1
    <script src="xopen.js"></script>
    <button onclick="xopen.open()">click me</button>

### 方法2
    <button id="i-am-a-button">click me</button>
    <script src="xopen.js"></script>
    <script>
        document.getElementById('i-am-a-button').addEventListener('click', function(){
            xopen.open();
        });
    </script>

