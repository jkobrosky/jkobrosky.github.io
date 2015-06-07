var app = angular.module('weatherFinder');

app.service('weatherServices', function($http, $q) {

	this.getWeather = function(STATE, CITY) {
		var deferred = $q.defer();
		$http({
			method: 'JSONP',
			url: 'http://api.wunderground.com/api/c5961b7e3f6ef2da/conditions/q/' + STATE + ',' + CITY
		}).then(function(response) {
			console.log(response);
			this.parsedData = response;
			deferred.resolve(parsedData);
		});
		return deferred.promise;
	};
});