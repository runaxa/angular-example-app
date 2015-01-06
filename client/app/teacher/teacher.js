(function(){
	var teacher = angular.module('teacher', ["highcharts-ng"]);
	teacher.directive('teacherView', function(){
		return {
			restrict: "E",
			templateUrl: "app/teacher/template.html"
		};
	});
	teacher.controller('TeacherVController', function($scope, $rootScope, socket){
		console.log("teacher view controller");
		$scope.testStart = false;
		$scope.correctRates = new Array();
		$scope.times = new Array();
		$scope.names = new Array();
		$scope.loading = true;

		var refreshChart = function(results){
			console.log("updateResults");
			$scope.names = [];
			$scope.correctRates = [];
			$scope.times = [];
			for(var i in results){
				console.log(results[i]);
				$scope.names.push(results[i].name);
				$scope.correctRates.push(results[i].correctRate);
				$scope.times.push(results[i].time);
			};
			console.log($scope.names);
			console.log($scope.correctRates);
			console.log($scope.times);
			$scope.chartSeries = [{
				"name": "成绩",
			    "data": $scope.correctRates,
			    "type": "bar",
			    "color": "#5EADAD"
			},{
				"name": "时间", 
			    "data": $scope.times,
			    "type": "bar",
			    "color": "#FFBE8B"
			}];

			$scope.chartCategories = $scope.names;

			$scope.chartConfig = {
			  options: {
			  	chart: {
				    type: 'column',
				    width: 4500,
			   		backgroundColor:null
			    },
			    plotOptions: {
			      series: {
			        stacking: ''
			      }
			    }
			  },
			  series: $scope.chartSeries,
			  xAxis: {
	            categories: $scope.chartCategories,
	            labels: { 
	                    rotation: 0,
	                    x: -5
	                }
	          },
	          yAxis: {
	            max: 100,                        //显示的最大值
	      	    title: {
	               text: '百分比'
	            }
	          },
			  title: {
			  	align: 'left',         //水平方向（left, right, bottom, top）
			  	marginLeft: 100,
			  	style: {color: "#000"},                 //样式
			    text: '得分排名'
			  },
			  credits: { //设置右下角的标记。highchart.com (这个也可以在highcharts.js里中修改)
	  	        text: "知好乐课堂测试",           //显示的文字
			    enabled: true
			  },
			  loading: false,
			  size: {}
			};

		};
		socket.on('exam', function(exam){
			$scope.exam = exam;
		});
		// socket.on('updateScore1',function(results){
		// 	console.log("updateScore1111111111111");
		// });
		socket.on('updateScore',function(results){
			if($scope.chartConfig){
				console.log("[updateScore]" + JSON.stringify(results));
				var correctRates = new Array();
				var usedTimes = new Array();
				for(var i in results){
					correctRates.push(results[i].correctRate);
					usedTimes.push(results[i].time);

				}
				$scope.chartConfig.series[0].data = correctRates;
				$scope.chartConfig.series[1].data = usedTimes;
				$scope.reflow();
				console.log("correctRates" + JSON.stringify(correctRates));
				console.log("usedTimes" + JSON.stringify(usedTimes));
			}
			refreshChart(results);
			
		});
		$scope.reflow = function () {
		  $scope.$broadcast('highchartsng.reflow');
		};
		var getResult = function(){
			socket.emit('updateResults');
		};

		$scope.startTest = function(){
			$scope.testStart = true;
			socket.emit('start');
			getResult();

			refreshChart([]);
		};
		
		$scope.endTest = function(){
			$scope.testStart = false;
			console.log("endTest");
			$scope.chartSeries = [];
		};
		


	});
})();