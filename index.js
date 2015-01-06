var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;

// 是否开始测试
var testStatus = false;
// 测试时间
var testTime = 30000;

var randomScalingFactor = function(){ return Math.round(Math.random()*100)}; 
 
var sortByTime = function(a, b){
	return b.time-a.time != 0 ? b.time-a.time : sortByName(a, b);
};
var sortByName = function(a, b){
	return b.name-a.name;
};
var sortByScore = function(a, b){
	return b.correctRate-a.correctRate != 0 ? b.correctRate-a.correctRate : sortByTime(a, b);
};

var getStudentList = function(unordered){
  	var students = new Array();
  	for(var i in users){
  		if(users.role == "teacher") continue;
  		students.push(users[i]);
  	}

  	if(!unordered){
  		students = students.sort(sortByScore)
  		for(var i in students){
  			students[i].position = i;
  		}
  	}

  	return students;
};
server.listen(port, function() {
	console.log('Server listening at port %d hi', port);
});
var result = {
	SUCCESS: 0,
	WRONG_PASSWORD: 1,
	WRONG_USERNAME: 2
};
// 用户基本信息
var users = [{
	name: "s0",
	password: "0",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: 0,
	time: 0,
	status: 1
},{
	name: "student1",
	password: "000000",
	role: "student",
	position: 1,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student2",
	password: "000000",
	role: "student",
	position: 2,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student3",
	password: "000000",
	role: "student",
	position: 3,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student4",
	password: "000000",
	role: "student",
	position: 4,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student5",
	password: "000000",
	role: "student",
	position: 5,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student6",
	password: "000000",
	role: "student",
	position: 6,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student7",
	password: "000000",
	role: "student",
	position: 7,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student8",
	password: "000000",
	role: "student",
	position: 8,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student9",
	password: "000000",
	role: "student",
	position: 9,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student10",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student11",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student12",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student13",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student14",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student15",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student16",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student17",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student18",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student19",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student20",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student21",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student22",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student23",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student24",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student25",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student26",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student27",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student28",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student29",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student30",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student31",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student32",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student33",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student34",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student35",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student36",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student37",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student38",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student39",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student40",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student41",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student42",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student43",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student44",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student45",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student46",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student47",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student48",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "student49",
	password: "000000",
	role: "student",
	position: 0,
	className: "四年1班",
	active: false,
	correctRate: randomScalingFactor(),
	time: 0,
	status: 1
},{
	name: "t",
	password:"0",
	role: "teacher",
	active: false
}];

// 当前班级
var currentClass =  {
	id: "1",
	name: "四年1班",
	counter: 50,
	total: 50
};

var exam = {
    		id: "0",
	  		time: 30,
	  		title:"数学加减法",
	  		type: "随堂练习",
	  		className: "四年1班",
	  		questions:[{
	  			id: "0",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "choice",
	  			choices:[
	  				{title: "A",content: "1895"},
	  				{title:"B", content: "1896"},
	  				{title:"C", content: "1897"},
	  				{title:"D", content: "1898"},
	  			],
	  			correctAnswers:"A",
	  			clientAnswer:{}
	  		},{
	  			id: "1",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "completion",
	  			correctAnswers:["1895"]
	  		},{
	  			id: "2",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "choice",
	  			choices:[
	  				{title: "A",content: "1895"},
	  				{title:"B", content: "1896"},
	  				{title:"C", content: "1897"},
	  				{title:"D", content: "1898"},
	  			],
	  			correctAnswers:["A"]
	  		},{
	  			id: "3",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "completion",
	  			correctAnswers:["1895"]
	  		},{
	  			id: "4",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "choice",
	  			choices:[
	  				{title: "A",content: "1895"},
	  				{title:"B", content: "1896"},
	  				{title:"C", content: "1897"},
	  				{title:"D", content: "1898"},
	  			],
	  			correctAnswers:["A"]
	  		},{
	  			id: "5",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "completion",
	  			correctAnswers:["1895"]
	  		},{
	  			id: "6",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "choice",
	  			choices:[
	  				{title: "A",content: "1895"},
	  				{title:"B", content: "1896"},
	  				{title:"C", content: "1897"},
	  				{title:"D", content: "1898"},
	  			],
	  			correctAnswers:["A"]
	  		},{
	  			id: "7",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "completion",
	  			correctAnswers:["1895"]
	  		},{
	  			id: "8",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "choice",
	  			choices:[
	  				{title: "A",content: "1895"},
	  				{title:"B", content: "1896"},
	  				{title:"C", content: "1897"},
	  				{title:"D", content: "1898"},
	  			],
	  			correctAnswers:["A"]
	  		},{
	  			id: "9",
	  			score: 10,
	  			title: "(    )年第一届现代奥运会在希腊举行。",
	  			type: "completion",
	  			correctAnswers:["1895"]
	  		}]
	  	};
// Routing
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res){ 
    res.sendFile(__dirname + '/client/index.html');
}); 

io.on('connection', function(socket){
  console.log('a user connected, client ID is ' + socket.id);
  socket.on('signin', function(userInfo, callback){
    console.log('Received a signin request');
    console.log(userInfo);
    var response;
    var timeInterval;
    var nameExist = false;
    for(var i in users){
    	if(userInfo.name == users[i].name){
    		nameExist = true;
    		response = userInfo.password == users[i].password ? {resultCode: result.SUCCESS, user: users[i]} : {resultCode: result.WRONG_PASSWORD}
    		// callback(response);
    		// socket.emit('signin response', response);
    	}
    }

    if(!nameExist)
    	response = {resultCode: result.WRONG_USERNAME};
    socket.emit('signin response', response);

    if( result.SUCCESS == response.resultCode)
    	socket.emit('exam',exam);
  });

  socket.on('updateResults', function(){  	
  		io.emit('updateScore', getStudentList());
  });

  var broadcastResults = function(){
  	console.log("broadcastResults");
  	if(socket){
  		console.log("socket is alive");
  		io.emit('updateScore', getStudentList());
  	}
  	else{
  		console.log("socket doesn`t exist");
  	}
  	
  };

  socket.on('start', function(){
  	console.log("[start]");
  	io.emit('start');
  	io.emit('updateScore', getStudentList());
  	  	var usedSec = 0;
  	  	var timeInterval = setInterval(function(){
  		  	console.log("time: " + usedSec);
  		  	usedSec ++;
  		  	for(var i in users){
  		  		if(users[i].status){
  		  			users[i].time = usedSec;
  		  		}
  		  	}
  		  	io.emit('updateScore', getStudentList());
  	  	}, 60 * 1000);
  	// countdown(exam.time);
  	setTimeout(function(){
  		clearInterval(timeInterval);
  	}, (30+1) * 60 * 1000)
  });
  socket.on('end',function(){
  	io.emit('end');
  	clearInterval(timeInterval);
  });
  socket.on('updateRate', function(data){
  	console.log("[updateRate]" + JSON.stringify(data));
  	for(var i in users){
  		if(users[i].name == data.userName){
  			users[i].correctRate += data.plus;
  			console.log(JSON.stringify(users[i]));
  		}
  	}

  	io.emit('updateScore', getStudentList());
  });
  socket.on('submitTest', function(name){
  	console.log("[submitTest]" + JSON.stringify(name));
  	for(var i in users){
  		if(users[i].name == name){
  			users[i].status = 0;
  			console.log(JSON.stringify(users[i]));
  		}
  	}

  	io.emit('updateScore', getStudentList());
  });
});
