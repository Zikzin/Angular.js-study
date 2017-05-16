/* 
* @Author: zyl
* @Date:   2017-05-09 14:42:54
* @Last Modified by:   zyl
* @Last Modified time: 2017-05-11 16:18:25
*/

(function (angular) {
    // 定义指令
    angular.module('movielist.directives.auto_focus',[])
        .directive('autoFocus',['$location', function($location){
            // var path = $location.path();
            return{
                
                restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                link: function($scope, iElm, iAttrs, controller){

                    $scope.$location = $location;
                    $scope.$watch('$location.path()',function(now){
                        // 当path发生变化时，now是变化后的值。
                        var aLink = iElm.children().attr('href');
                        var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
                        if(now.startsWith(type)){
                            // 访问的是当前链接
                            iElm.parent().children().removeClass('active');
                            iElm.addClass('active');
                        } 
                    });

                   
                    // iElm.on('click', function() {
                    //     iElm.parent().children().removeClass('active');
                    //     iElm.addClass('active');
                        // window.iele = iElm;
                    // });
                }
            }
    }])
})(angular);