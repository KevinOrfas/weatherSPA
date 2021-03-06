// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

//SERVICES
weatherApp.service('cityService', function() {
    this.city = 'New York, NY';
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$filter','$routeParams','cityService', function($scope, $resource, $filter, $routeParams,cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    
    //Forcast API
    // $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast?appid=a46a814baecd22a559e0bcdff847dec9', {callback: 'JSON_CALLBACK'}, {get: { method: 'JSONP'}});

    //Test API
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=a46a814baecd22a559e0bcdff847dec9', {callback: 'JSON_CALLBACK'}, {get: { method: 'JSONP'}});

    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
    
    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8 * (degK - 273)) + 32 );
    }

    $scope.convertToCelcius = function(degK){
        return Math.round(degK - 273);
    }

    // $scope.conversion = function(){
        
    // }

    $scope.convertToDate = function(dt){
        // return new Date(dt * 1000).toLocaleString();
        return $filter('date')(new Date(dt * 1000), 'mediumDate', 'UTC');
    }
    
}]);
