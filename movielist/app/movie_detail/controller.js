/* 
* @Author: zyl
* @Date:   2017-05-15 16:00:19
* @Last Modified by:   zyl
* @Last Modified time: 2017-05-16 10:57:57
*/

(function(angular){
    'use strict';

    // 创建正在热映模块
    var module = angular.module(
        'movielist.movie_detail', [
        'ngRoute',
        'movielist.services.http'
        ]);

    // 配置模块的路由
    module.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/detail/:id', {
        templateUrl: 'movie_detail/view.html',
        controller: 'MovieDetailController'
      });
    }]);

    module.controller('MovieDetailController', [
        '$scope',
        // '$http',
        '$route',
        '$routeParams',
        'HttpService',
        'AppConfig',
        function($scope, $route, $routeParams, HttpService, AppConfig) {

           $scope.movie = '' ;
           $scope.loading = true;
           var id = $routeParams.id;

           var apiAddress = AppConfig.detailApiAddress + id;

           // 跨域的方式
           
            HttpService.jsonp(apiAddress,{},function(data){

                $scope.movie = data;
                $scope.loading = false;

                $scope.$apply();
           });
        }
    ]);
})(angular);
