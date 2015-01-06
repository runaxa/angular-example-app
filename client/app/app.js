(function(){
	var app = angular.module('test-app', ['ui.bootstrap', 'signin', 'student', 'teacher','highcharts-ng']);
	app.controller('ViewController', function($rootScope){
		$rootScope.active = {
			signin: true,
			student: false,
			teacher: false
		};
		$rootScope.user = {};
	});

	app.factory('socket', function($rootScope){
		var socket = io('http://localhost:3000');
		return {
			on: function(eventName, callback){
				socket.on(eventName, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						callback.apply(socket, args);
					});
				});
			},
			emit: function(eventName, data, callback){
				socket.emit(eventName, data, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						if(callback){
							callback.apply(socket, args);
						}
					});
				});
			}
		};
	});

	app.factory('userInfo', function($rootScope){
		console.log("userInfo factory");
		return {
			get: function(){
				console.log($rootScope.user);
				return $rootScope.user;
			},
			set: function(userInfo){
				console.log(userInfo);
				$rootScope.user = userInfo;
			}
		};
	});
})();
