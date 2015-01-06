(function(){
	var result = {
		SUCCESS: 0,
		WRONG_PASSWORD: 1,
		WRONG_USERNAME: 2
	};
	var login = angular.module('signin', []);
	var print = function(config){
		if(!config.color)
			config.color = "#0000CD";
		if(config.funName)
			console.log("%c [signin], " + "in function " + config.funName, "color:" + config.color);
		if(config.log){
			if("object" === typeof(config.log)){
				config.log = JSON.stringify(config.log);
			}
			console.log("%c" + config.log, "color:" + config.color);
		}
	};
	login.directive('signinView', function(){
		return {
			restrict: "E",
			templateUrl: "app/signin/template.html"
		};
	});
	login.controller('SigninController', function($scope, $rootScope, socket){
		var response;
		// $rootScope.user = {
		// 	name: "student1",
		// 	password: "000000",
		// 	role: "student"
		// };
		$rootScope.active.signin = true;

		socket.on('connect', function(){			
			console.log("connected with the server");
		});

		socket.on('disconnect', function(){});

		socket.on('signin response',function(response){
			console.log("handling signin response");
				console.log(response);
				var user;
				if(result.SUCCESS != response.resultCode){
					//TODO alert error tips
					return;
				}

				$rootScope.user = response.user;
				print({log: $rootScope.active});
				$rootScope.active.signin = false;
				print({log:$rootScope.user.role})
				if("teacher" == $rootScope.user.role){
					print({log: "Show teacher view"});
					$rootScope.active.teacher = true;
				}
				else{
					print({log: "Show student view"});
					$rootScope.active.student = true;
				}
		});

		$scope.signin = function(){
			print({log: "signin"})
			socket.emit('signin', $rootScope.user, function(response){
				console.log("handling signin response");
				console.log(response);
				var user;
				if(result.SUCCESS != response.resultCode){
					//TODO alert error tips
					return;
				}

				$rootScope.user = response.user;
				print({log: $rootScope.active});
				$rootScope.active.signin = false;
				print({log:$rootScope.user.role})
				if("teacher" == $rootScope.user.role){
					print({log: "Show teacher view"});
					$rootScope.active.teacher = true;
				}
				else{
					print({log: "Show student view"});
					$rootScope.active.student = true;
				}
			});
		};
	});
})();