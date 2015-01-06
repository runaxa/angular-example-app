(function(){
	var question = angular.module('question', []);
	question.directive('questionView', function(){
		return {
			restrict: "E",
			templateUrl: "app/question/template.html"
		};
	});
	question.controller('questionVController', function($scope, $rootScope, socket){
		console.log("question view controller");
		$scope.currentQuestion = 0;
		$scope.firstQuestion = true;
		$scope.lastQuestion = false;
		$scope.showPrev = function(){
			//TODO show previous question
		};
		$scope.showNext = function(){
			//TODO show next question
		};
	});
})();