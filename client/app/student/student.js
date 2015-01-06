(function(){
	var student = angular.module('student', []);
	student.directive('studentView', function(){
		return {
			restrict: "E",
			templateUrl: "app/student/template.html"
		};
	});
	student.controller('StudentVController', function($scope, $rootScope, socket){
		console.log("student view controller");
		$scope.testStart = false;
		$scope.questions = new Array();
		$scope.currentQuestionNum = -1;
		$scope.currentQuestion = {};
		$scope.firstQuestion = true;
		$scope.lastQuestion = true;
		$scope.answeredAll = false;
		$scope.answeredQuestion = 0;
		$scope.totalQ = 0;
	    $scope.chartConfig = {
	        options: {
	            chart: {
	                type: 'solidgauge',
			   		backgroundColor:null
	            },
	            pane: {
	                center: ['50%', '75%'],
	                size: '140%',
	                startAngle: -90,
	                endAngle: 90,
	                background: {
	                    backgroundColor:'#EEE',
	                    innerRadius: '60%',
	                    outerRadius: '100%',
	                    shape: 'arc'
	                }
	            }
	        },
	        tooltip:{
	        	valueSuffix: '分钟'
	        },
	        series: [{
	        	name: '时间',
	            data: [16],
	            dataLabels: {
	        		// enabled: false,
		        	format: '<div style="text-align:center"><span style="font-size:10px;color:black">{y}</span><br/>' + 
	                   	'<span style="font-size:3px;color:silver">分钟</span></div>'
		        },
	            borderWidth: 0

	        }],
	        title: {
	        	enabled:false,
	        	y: -100,
	        	text: '时间'
	        },
	        yAxis: {
	            min: 0,
	            max: 30,
	            title: {
	        		enabled:false,
	            	y: -30,
	                text: '时间'
	            },      
				stops: [
	                [0.9, '#31A831'], //green 
		        	[0.8, '#D2813D'], // yellow
		        	[0.7, '#D23D3D'] // red
				],
				lineWidth: 0,
	            tickInterval: 30,
            	minorTickInterval: null,
	            tickPixelInterval: 200,
	            tickWidth: 0,
	            labels: {
	                y: 15
	            }
	        },
	        loading: false,
	        credits: {
	        	enabled: false
	        }
	    };
	    $scope.$watch('user', function(){
	    	console.log("user.time is changing");
	    	$scope.chartConfig.series[0].data[0] = $rootScope.user.time;
	    });
		$scope.$watch('currentQuestionNum', function(){
			$scope.firstQuestion =  $scope.currentQuestionNum>0 ? false : true;
			$scope.lastQuestion = $scope.currentQuestionNum < $scope.questions.length-1 ? false : true;
			console.log("Is first question:" + $scope.firstQuestion + 
				"\n Is last question: " + $scope.lastQuestion);
			if($scope.currentQuestionNum >= 0)
			{
				$scope.currentQuestion = $scope.questions[$scope.currentQuestionNum];
				if($scope.currentQuestion.type == "choice"){
					$scope.isChoice = true;
				}
				else if($scope.currentQuestion.type == "completion"){
					$scope.isChoice = false;
				}
				if($scope.currentQuestionNum == $scope.questions.length-1){
					$scope.answeredAll = true;
				}
			}
			if($scope.answeredQuestion <= $scope.currentQuestionNum) {
				$scope.answeredQuestion = $scope.currentQuestionNum + 1;
				$scope.progress = $scope.answeredQuestion / $scope.questions.length * 100;
			}
				
		});
		$scope.currentAnswer = "I`m the currentAnswer";
		// $scope.$watch('currentAnswer', function(){
		// 	// TODO solusion for MCQ
		// 	$scope.currentQuestion.clientAnswer = $scope.currentAnswer;
		// 	console.log($scope.currentQuestion);
		// });
		$scope.showPrev = function(){
			console.log("showPrev");
			$scope.currentQuestionNum --;
			//TODO show previous question
		};
		$scope.showNext = function(){
			console.log("showNext");
			console.log($scope.currentAnswer);
			if($scope.currentAnswer == $scope.currentQuestion.correctAnswers){
				socket.emit('updateRate',{userName: $rootScope.user.name,
											plus: $scope.currentQuestion.score})
			}

			$scope.currentQuestionNum ++;
			$scope.currentAnswer = "";
			//TODO upload answer $scope.currentAnswer
		};
		$scope.submitTest = function(){
			$scope.answeredAll = false;
			$scope.firstQuestion = true;
			$scope.lastQuestion = true;
			socket.emit('submitTest', $rootScope.user.name);
			//TODO show report
		};
		socket.on('start', function(){
			// TODO star test
			console.log("[start]");
			$scope.testStart = true;
		});
		socket.on('exam', function(exam){
			$scope.exam = exam;
			$scope.questions = exam.questions;
			$scope.totalQ = exam.questions.length;
			console.log("$scope.totalQ " + $scope.totalQ);
			$scope.currentQuestionNum = $scope.questions.length>0 ? 0 : -1;
			if($scope.currentQuestionNum >= 0){
				$scope.currentQuestion = $scope.questions[$scope.currentQuestionNum];
			}

		});
		socket.on('updateScore',function(results){
			console.log("updateScore")
			for(var i in results){
				if(results[i].name == $rootScope.user.name){
					$rootScope.user = results[i];
					break;
				}
			}
		});
		socket.on('end',function(){
			$scope.submitTest();
		})
	});
})();