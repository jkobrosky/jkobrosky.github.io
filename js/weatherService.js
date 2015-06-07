var app = angular.module('weatherFinder');

app.service('weatherService', function($http, $q) {

	var iconSetter = function(wxInfo) {
		console.log('test before switch', wxInfo);
		switch (wxInfo) {
			case 'Clear':
				return 'wi-day-sunny';
				break;
			case 'Overcast':
				return 'wi-day-sunny-overcast';
				break;
			case 'Partly Cloudy':
				return 'wi-day-cloudy';
				break;
			case 'Scattered Clouds':
				return 'wi-day-cloudy';
				break;
			case 'Mostly Cloudy':
				return 'wi-cloudy';
				break;
			case 'Chance of Rain':
				return 'wi-rain';
				break;
			case 'Rain':
				return 'wi-showers';
				break;
			case 'Chance of a Thunderstorm':
				return 'wi-day-storm-showers';
				break;
			case 'Thunderstorm':
				return 'wi-day-thunderstorm';
				break;
			default:
				return 'wi-alien';
		}
	};
	
	this.getWeather = function(location) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'http://api.wunderground.com/api/c5961b7e3f6ef2da/conditions/q/' + location.state + '/' + location.town + '.json'
		}).then(function(response) {
			console.log(response);
			this.currentWxConditions = response.data.current_observation.weather;
			this.parsedData = {
				location: response.data.current_observation.display_location.full,
				temp: response.data.current_observation.feelslike_f,
				conditions: response.data.current_observation.weather,
				icon: iconSetter(currentWxConditions)
			};

			deferred.resolve(parsedData);
		});
		return deferred.promise;
	};

	this.getForecast = function(location) {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: 'http://api.wunderground.com/api/c5961b7e3f6ef2da/forecast10day/q/' + location.state + '/' + location.town + '.json'
		}).then(function(forecastResponse) {
			console.log('forecast response', forecastResponse);
			this.parsedForecast = {
				current: {
					currentDate: forecastResponse.data.forecast.simpleforecast.forecastday[0].date.weekday + ' , ' + forecastResponse.data.forecast.simpleforecast.forecastday[0].date.monthname + forecastResponse.data.forecast.simpleforecast.forecastday[0].date.day
				},
				day1: {
					high: forecastResponse.data.forecast.simpleforecast.forecastday[1].high.fahrenheit,
					low: forecastResponse.data.forecast.simpleforecast.forecastday[1].low.fahrenheit,
					icon: iconSetter(forecastResponse.data.forecast.simpleforecast.forecastday[1].conditions),
					date: {
						month: forecastResponse.data.forecast.simpleforecast.forecastday[1].date.monthname,
						day: forecastResponse.data.forecast.simpleforecast.forecastday[1].date.day,
						weekday: forecastResponse.data.forecast.simpleforecast.forecastday[1].date.weekday,
						ampm: forecastResponse.data.forecast.simpleforecast.forecastday[1].date.ampm
					}
				},
				day2: {
					high: forecastResponse.data.forecast.simpleforecast.forecastday[2].high.fahrenheit,
					low: forecastResponse.data.forecast.simpleforecast.forecastday[2].low.fahrenheit,
					icon: iconSetter(forecastResponse.data.forecast.simpleforecast.forecastday[2].conditions),
					date: {
						month: forecastResponse.data.forecast.simpleforecast.forecastday[2].date.monthname,
						day: forecastResponse.data.forecast.simpleforecast.forecastday[2].date.day,
						weekday: forecastResponse.data.forecast.simpleforecast.forecastday[2].date.weekday,
						ampm: forecastResponse.data.forecast.simpleforecast.forecastday[2].date.ampm
					}
				},
				day3: {
					high: forecastResponse.data.forecast.simpleforecast.forecastday[3].high.fahrenheit,
					low: forecastResponse.data.forecast.simpleforecast.forecastday[3].low.fahrenheit,
					icon: iconSetter(forecastResponse.data.forecast.simpleforecast.forecastday[3].conditions),
					date: {
						month: forecastResponse.data.forecast.simpleforecast.forecastday[3].date.monthname,
						day: forecastResponse.data.forecast.simpleforecast.forecastday[3].date.day,
						weekday: forecastResponse.data.forecast.simpleforecast.forecastday[3].date.weekday,
						ampm: forecastResponse.data.forecast.simpleforecast.forecastday[3].date.ampm
					}
				},
				day4: {
					high: forecastResponse.data.forecast.simpleforecast.forecastday[4].high.fahrenheit,
					low: forecastResponse.data.forecast.simpleforecast.forecastday[4].low.fahrenheit,
					icon: iconSetter(forecastResponse.data.forecast.simpleforecast.forecastday[4].conditions),
					date: {
						month: forecastResponse.data.forecast.simpleforecast.forecastday[4].date.monthname,
						day: forecastResponse.data.forecast.simpleforecast.forecastday[4].date.day,
						weekday: forecastResponse.data.forecast.simpleforecast.forecastday[4].date.weekday,
						ampm: forecastResponse.data.forecast.simpleforecast.forecastday[4].date.ampm
					}
				},
				day5: {
					high: forecastResponse.data.forecast.simpleforecast.forecastday[5].high.fahrenheit,
					low: forecastResponse.data.forecast.simpleforecast.forecastday[5].low.fahrenheit,
					icon: iconSetter(forecastResponse.data.forecast.simpleforecast.forecastday[5].conditions),
					date: {
						month: forecastResponse.data.forecast.simpleforecast.forecastday[5].date.monthname,
						day: forecastResponse.data.forecast.simpleforecast.forecastday[5].date.day,
						weekday: forecastResponse.data.forecast.simpleforecast.forecastday[5].date.weekday,
						ampm: forecastResponse.data.forecast.simpleforecast.forecastday[5].date.ampm
					}
				}
			};
			dfd.resolve(parsedForecast);
		});
		return dfd.promise;
	};

});

//http://api.wunderground.com/api/c5961b7e3f6ef2da/conditions/q/ -- This gets weather for a single day.
//http://api.wunderground.com/api/c5961b7e3f6ef2da/forecast/q/ -- This gets weather for 4 days.
//http://api.wunderground.com/api/c5961b7e3f6ef2da/forecast10day/q/ -- This gets weather for 10 days.