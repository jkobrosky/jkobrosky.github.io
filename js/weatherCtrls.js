var app = angular.module('weatherFinder');

app.controller('weatherCtrls', function($scope, weatherServices) {

	$scope.getWeather = function() {
		weatherServices.getWeather($scope.state, $scope.town).then(function(response) {
			console.log(response);
			$scope.weather = response;
		}, function(error) {
			console.log('encoutered an error: ', error);
		});
	};
});