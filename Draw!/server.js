var express = require('express');

var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

var words = require('./node_modules/names/words.js');
var s = []; //keeps track of sockets in server
var num = 0; //unique number identifier
var currTime = 60; //timers for game
var maxTime = 60;
var currWord; //what the current word to guess is
var revealedIndex = []; //revealed letters of current word
var currPlayer;
var playerList = []; //current player list: snapshot of sockets
var playerIndexes = []; //which players havent gone
var inProgress = false; //game in progress?
var numCorrect = 0; //number of players that guessed the word
var roundNum = 1;
var roundLimit = 5;
function newConnection(socket) {
	console.log('New Connection: ' + socket.id);
	
	//adds to player list on client side
	for (d of s) {
		if ('name' in d) {
			var data = {icon: d.icon, name: d.name, num: d.num, score: 0};
			socket.emit('nameInfo', data);
		}
	}
	
	//adds to socket list
	s.push({socket: socket, id: socket.id, num: num});
	
	console.log(s.length);
	num += 1; //increments uniqueID
	
	
	socket.on('join', joinMsg);
	//recieves icon and name
	function joinMsg(data) {
		for (d of s) {
			if (d.id == socket.id) {
				//sets icon and name to server side sockets
				d.name = data.name;
				d.icon = data.icon;
				//sets uniqueID to data
				data.num = d.num;
				//instantiates score and draw turn
				data.score = 0;
				data.draw = false;
			}
		}
		
		socket.broadcast.emit('join', data);
		socket.emit('selfJoin', data);
	}
	
	socket.on('disconnect', remove);
	
	function remove() {
		//removes socket from socket list
		for (d of s) {
			if (d.id == socket.id) {
				var data = {num: d.num};
				socket.broadcast.emit('leave', data);
				s.splice(s.indexOf(d), 1);
				console.log('number left in server" ', s.length);
			}
		}
		
		//removes player from player list
		for (p of playerList) {
			if (p.id == socket.id) {
				var index = playerList.indexOf(p);
				playerList.splice(index, 1);
			}
		}
		//refreshes player indexes
		clearIndexes();
	}
	
	//when start button is pressed
	socket.on('start', initiate);
	
	function initiate() {
		//temporary disable start button until finished
		if (inProgress) {
			return;
		}
		inProgress = true;
		console.log('initiate');
		//resets all information
		currTime = maxTime;
		playerList = [];
		playerIndexes = [];
		revealedIndex = [];
		//snapshots current sockets and adds additional information
		for (var i = 0; i < s.length; i++) {
			playerList.push({socket: s[i].socket, name: s[i].name, id: s[i].id, num: s[i].num, correct: false, gone: false, score: 0});
			playerIndexes.push(i);
		}
		var d = {round: roundNum};
		io.sockets.emit('sendRound', d);
		startRound();
	}
	
	
	//starts a round
	function startRound() {
		//ends round if there's only 1 player
		if (playerList.length <= 1) {
			return;
		}
		io.sockets.emit('clear', {});
		//generates random index for player
		var tempNum = choosePlayer();
		console.log(playerList, tempNum);
		
		//uses socket
		currPlayer = playerList[tempNum].socket;
		
		var playerNum = playerList[tempNum].num; //saves unique ID for drawing pencil
		
		playerList[tempNum].gone = true; //marks the player
		
		currWord = words.word(); //saves curr word from randomly generated word
		
		//sends data for pencil and word
		var drawData = {word: currWord, num: playerNum};
		var guessData = {word: blankWord(currWord), num: playerNum};
		currPlayer.broadcast.emit('start', guessData);
		currPlayer.emit('startDraw',drawData);
		
		console.log(currWord);
		
		//initiate timer
		interval = setInterval(update, 1000);
	}
	
	//helper function to generate blank word
	function blankWord(word) {
		var str = "";
		for (var i =0; i < word.length; i++) {
			str += '*';
		}
		return str;
	}
	
	//helper function to choose a random avaliable player
	function choosePlayer() {
		var randPlayer = Math.floor(Math.random() * playerIndexes.length);
		var ans = playerIndexes[randPlayer];
		playerIndexes.splice(randPlayer, 1);
		return ans;
	}
	
	function update() {
		//checks end round
		if (numCorrect + 1 == playerList.length) {
			endRound();
		}
		//updates time client and server side
		
		var data = {currTime: currTime, maxTime: maxTime};
		io.sockets.emit('time', data);
		
		//checks time 
		timeCondition();
		currTime -= 1;
	}
	
	function timeCondition() {
		//reveal a letter
		if (currTime == Math.floor(maxTime / 2)) {
			revealLetter();
			
		//reveal a second letter
		} else if (currTime == Math.floor(maxTime / 4)) {
			revealLetter();
		}
		
		//resets round when time runs out
		if (currTime == 0) {
			var d = {word: currWord};
			io.sockets.emit('correct', d);
			endRound();
			
		}
	}
	
	function endRound() {
		if (playerIndexes.length == 0) {
			resetRow();
			roundNum += 1;
			if (roundNum < roundLimit) {
				var d = {round: roundNum};
				io.sockets.emit('sendRound', d);
			}
			
		}
		resetRound();
		numCorrect = 0;
		if (roundNum < roundLimit) {
			setTimeout(startRound, 3000);
		} else {
			roundNum = 1;
			var arr = sort();
			var data = arr[0];
			setTimeout(function() {io.sockets.emit('winner', data)}, 2000);
			
		}
	}
	
	function sort() {
		var arr = [];
		for (p of playerList) {
			arr.push({name: p.name, score: p.score});
		}
		
		var arr = arr.sort(function(a,b) {return b.score - a.score;});
		return arr;
	}
	function revealLetter() {
		var list = [];
		for(var i = 0; i < currWord.length; i++) {
			if (!revealedIndex.includes(i)) {
				list.push(i);
			}
		}
		var index = Math.floor(Math.random() * list.length);
		revealedIndex.push(index);
		var d = {index: index, letter: currWord[index]};
		io.sockets.emit('updateWord', d);
	}
	//resets round
	function resetRound() {
		clearInterval(interval);
		currTime = maxTime;
		inProgress = false;
		//resets correctness
		for (p of playerList) {
			p.correct = false;
		}
	}
	
	//change all player's gone status to false
	function resetRow() {
		for (p of playerList) {
			p.gone = false;
		}
		clearIndexes();
	}
	
	//refreshes player index array
	function clearIndexes() {
		playerIndexes = [];
		for (var i = 0;  i < playerList.length; i++) {
			if (!playerList[i].gone) {
				playerIndexes.push(i);
			}	
		}
	}
	
	//sends draw info back to other clients
	socket.on('mouse', mouseMsg);
	function mouseMsg(data) {
		socket.broadcast.emit('mouse', data);
	}
	
	socket.on('dot', dotMsg);
	
	function dotMsg(data) {
		socket.broadcast.emit('dot', data);
	}
	
	//handles messages and guesses
	socket.on('send', myMsg);
	
	function myMsg(data) {
		if (data.message == currWord) {
			if (socket.id != currPlayer.id) {
				if (markCorrect(socket.id) == 1) {
					var d = {word: currWord};
					socket.emit('correct', d);
					numCorrect += 1;
					
					if (numCorrect == 1) {
						currTime  = Math.floor(maxTime / 4);
						revealLetter();
						update();
					}
					var name = {name: getName(socket.id)};
					io.sockets.emit('sendCorrect', name);
					console.log('numCorrect: ', numCorrect);
				}
			}
		} else {
			io.sockets.emit('send', data);
		}
		
	}
	
	//s for other players
	socket.on('clear', clear);
	
	function clear(data) {
		socket.broadcast.emit('clear', data);
	}
}

//helper function to identify correct and update score
function markCorrect(id) {
	for (p of playerList) {
		if (p.id == id) {
			if (p.correct) {
				return 0;
			} else {
				p.correct = true;
				p.score += currTime;
				var data = {num: p.num, score: p.score};
				io.sockets.emit('updateScore', data);
				return 1;
			}
		}
	}
	return 0;
}

function getName(id) {
	for (p of s) {
		if (p.id == id) {
			return p.name;
		}
	}
	return '';
}