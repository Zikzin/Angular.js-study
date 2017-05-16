/* 
* 手写一个跨域的组件
* @Author: zyl
* @Date:   2017-05-05 15:05:10
* @Last Modified by:   zyl
* @Last Modified time: 2017-05-08 11:26:02
*/
'use strict';

(function(window,document,undefined){
    // 定义一个jsonp的函数
    var jsonp = function(url, data, callback){

        // 1、挂载回调函数
        var fnSuffix = Math.random().toString().replace('.','');
        var cbFuncName = 'my_json_cb_' + fnSuffix;
        // 不推荐将callback直接挂到全局环境里，最好带一个参数如：cb.my_json_cb_，这里是因为豆瓣不支持。
        window[cbFuncName] = callback;
 


        // 2、将data转换成url字符串的形式，如：{id:1,name:'zhangsan'} => id=1&name=zhangsan(遍历的方式)
        // var querystring = '?';
        var querystring = url.indexOf('?')==-1 ? '?' : '&';
        // 要考虑下url中有？的情况，有？时用&
        for(var key in data){
            querystring += key + '=' + data[key] + '&' ;
                        // id     =         1    &
                    
        }
        // querystring = ?id=1&name=zhangsan&
        

        // 3、处理url地址中的回调参数
        // url += callback=dkdjjkkk
        querystring += 'callback=' + cbFuncName;
        // random()是0到1的随机数，会有个小数点，要解决掉
        // querystring = ?id=1&name=zhangsan&cb=my_json_cb_120345652
        

        // 4、创建一个script标签（节点）
       var scriptElement = document.createElement('script');
       scriptElement.src = url + querystring;
       // 注意此时还不能将其append到页面上，要先挂载回调函数，所以第一步就是。

        // 5、将script标签放到页面中
        document.body.appendChild(scriptElement);
        // append过后页面会自动对这个地址发送请求，请求完成后，自动执行。
    }

    window.$jsonp = jsonp;
})(window,document);