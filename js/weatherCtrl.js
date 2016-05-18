var app = angular.module('weatherFinder');

app.controller('weatherCtrl', function($scope, weatherService) {
	
	$scope.isVisible = true;

	$scope.getWeather = function(location) {
		weatherService.getWeather(location).then(function(data) {
			$scope.city = data.location;
			$scope.temp = data.temp;
			$scope.conditions = data.conditions;
			$scope.wxIcon = data.icon;
			$scope.location.state = '';
			$scope.location.town = '';
			console.log('in controller', data);
		}, function(error) {
			console.log(error);
		});
	};

	$scope.getForecast = function(location) {
		weatherService.getForecast(location).then(function(forecastResponse) {
			console.log('forecast from ctrl', forecastResponse);
			$scope.currentDay = forecastResponse.current.currentDate;

			$scope.forecastIconD1 = forecastResponse.day1.icon;
			$scope.forecastIconD2 = forecastResponse.day2.icon;
			$scope.forecastIconD3 = forecastResponse.day3.icon;
			$scope.forecastIconD4 = forecastResponse.day4.icon;
			$scope.forecastIconD5 = forecastResponse.day5.icon;

			$scope.forecastHighD1 = forecastResponse.day1.high;
			$scope.forecastHighD2 = forecastResponse.day2.high;
			$scope.forecastHighD3 = forecastResponse.day3.high;
			$scope.forecastHighD4 = forecastResponse.day4.high;
			$scope.forecastHighD5 = forecastResponse.day5.high;

			$scope.forecastLowD1 = forecastResponse.day1.low;
			$scope.forecastLowD2 = forecastResponse.day2.low;
			$scope.forecastLowD3 = forecastResponse.day3.low;
			$scope.forecastLowD4 = forecastResponse.day4.low;
			$scope.forecastLowD5 = forecastResponse.day5.low;

			$scope.forecastWeekdayD1 = forecastResponse.day1.date.weekday;
			$scope.forecastWeekdayD2 = forecastResponse.day2.date.weekday;
			$scope.forecastWeekdayD3 = forecastResponse.day3.date.weekday;
			$scope.forecastWeekdayD4 = forecastResponse.day4.date.weekday;
			$scope.forecastWeekdayD5 = forecastResponse.day5.date.weekday;

		}, function(error) {
			console.log(error);
		});

	};

	$scope.toggleSearch = function(location) {
		if ($scope.location === true && $scope.isVisible === true) {
			getWeather(location);
			getForecast(location);
			//$scope.isVisible = !$scope.isVisible;
		} else {
			//$scope.isVisible = !$scope.isVisible;
		}
	};

	$scope.getSettings = function() {
		console.log('user profile goes here');
	}

});
