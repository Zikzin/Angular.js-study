
'use strict';

// Declare app level module which depends on views, and components
angular.module('movielist', [
   'ngRoute',
   'movielist.movie_detail',
   'movielist.movie_list',
   'movielist.directives.auto_focus',
  // 'movielist.in_theaters',
  // 'movielist.coming_soon',
  // 'movielist.top250'
])
// 为模块定义一些常量
.constant('AppConfig',{
  pageSize:2,
  listApiAddress:'http://api.douban.com/v2/movie/',
  detailApiAddress:'http://api.douban.com/v2/movie/subject/'
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
.controller('SearchController',[
    '$scope',
    '$route',
    'AppConfig',
    function($scope, $route, AppConfig){
      // console.log(AppConfig);
    $scope.input = ''; // 取文本框中的输入
    $scope.search = function(){
        // console.log($scope.input);
        // 将获取到的文本放到url上。最简单的方式参考分页用$route来updataParams把page改为了确定的值。
        $route.updateParams({ category: 'search', q: $scope.input});
    };
}]);

// .controller('NavController',[
// '$scope',
// '$location',
// function($scope, $location){
//   $scope.$location = $location;
//   $scope.$watch('$location.path()', function(now){
//     if (now.startsWith('/in_theaters')) {
//       $scope.type = 'in_theaters';
//     } else if (now.startsWith('/coming_soon')) {
//       $scope.type = 'coming_soon';
//     } else if(now.startsWith('/top250')) {
//       $scope.type = 'top250';
//     }
//     console.log($scope.type);
//   });
// }]);
