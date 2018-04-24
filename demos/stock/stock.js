
var apiKey = 'WDY9UDH99K9I5MMI';

var output = 'compact';
var i;
var smallInfo;
var index = 1;
var min = 10000;
var max = 0;
var chart;
var stockApp = angular.module('stockApp', []);
stockApp.controller('stockController', function($scope, $http, $interval){
	
	$scope.symbols = ['AMD', 'ATHX', 'MGM', 'XNET']
	$scope.intervals = [1, 2, 3, 5]
	$scope.types = ['TIME_SERIES_INTRADAY', 'TIME_SERIES_DAILY'];
	$scope.total = 10000;
	$scope.original = 10000;
	$scope.shareTotal = 0;
	$scope.bought = {symbol: 'AMD', price: 0, quantity: 0};
	$scope.infoPressed = false;
	
	$scope.info = function() {
		$scope.infoPressed = true;
		if (typeof $scope.symbol !== 'undefined' || 
			typeof $scope.chartInterval !== 'undefined' ||
			typeof $scope.tickInterval !== 'undefined') {
				console.log($scope.symbol, $scope.chartInterval, $scope.tickInterval);
				$scope.bought.symbol = $scope.symbol;
				$(".modal").css('display', 'none');
				//daily
				if ($scope.chartInterval == 2) {
					chart = 1;
					$scope.type = $scope.types[1];
					$scope.l = 'https://www.alphavantage.co/query?function=' + $scope.type + '&symbol=' + $scope.symbol + '&outputsize=' + output + '&apikey=' + apiKey;
				//intraday
				} else {
					chart = 0;
					$scope.type = $scope.types[0];
					$scope.l = 'https://www.alphavantage.co/query?function=' + $scope.type + '&symbol=' + $scope.symbol + '&interval=' + $scope.chartInterval + 'min&outputsize=' + output + '&apikey=' + apiKey;
				}
			//after button is pressed
			APIRequest();
			}
	}
	
	
	$scope.buyShares = function() {
		$scope.buy = +$scope.buy;
		if ($scope.buy >= 0 && $scope.buy * $scope.price < $scope.total) {
			$scope.total -= $scope.buy * $scope.price;
			$scope.shareTotal += $scope.buy * $scope.price;
			$scope.bought.price = changeFill($scope.bought.price, $scope.bought.quantity, 
											$scope.price, $scope.buy);
			$scope.bought.quantity += $scope.buy;
			$scope.buy = "";
		}
	}
	
	$scope.sellShares = function() {
		$scope.sell = +$scope.sell;
		if ($scope.sell >= 0 && $scope.sell <= $scope.bought.quantity) {
			$scope.total += $scope.sell * $scope.price;
			$scope.shareTotal -= $scope.sell * $scope.bought.price;
			$scope.bought.quantity -= +$scope.sell;
			if ($scope.bought.quantity == 0) {
				$scope.bought.price = 0;
			}
			$scope.sell = "";
		}
	}
	
	function changeFill(f0, q0, f1, q1) {
		return (f0 * q0 + f1 * q1) / (q1 + q0);
	}
	

	function APIRequest() {
		$http.get($scope.l).then(function(response) {
			var timeSeries;
			if ($scope.chartInterval == 2) {
				timeSeries = "Time Series (Daily)";
			} else if ($scope.chartInterval == 5) {
				timeSeries = "Time Series (5min)"
			} else if ($scope.chartInterval == 1) {
				timeSeries = "Time Series (1min)"
			}
			$scope.resp = response['data'][timeSeries];
			console.log($scope.resp);
			i = convertInfo($scope.resp);
			
			
		});
	}
	
	$scope.$watch('resp', function() {
		if ($scope.infoPressed) {
			$(".loading").css('display', 'none');
			$(".start").css('display', 'block');
			//startUpdate();
		}
	})
	
	$scope.startUpdate = function() {
		$(".start").css('display', 'none');
		interval = $interval(update, 1000 * $scope.tickInterval);
	}
	
	function update() {
		if (index < 20) {
			smallInfo = i.slice(0, index);
		} else {
			smallInfo = i.slice(index - 20, index);
		}
		//get open price
		$scope.price = smallInfo[smallInfo.length - 1][2];
		
		if (index < 100) {
			index++;
		} else {
			$interval.cancel(interval);
		}
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
	}
});

$(document).ready(function(){
	fitToContainer();
});

$(window).resize(function() {
	fitToContainer();
});

function fitToContainer() {
	$('#chartDiv').css('height', Math.floor($(window).height()* 3 / 6));
	$('#loading').css('margin-top', Math.floor($(window).height()* 2 / 6));
	
};

//from google charts api
function drawChart() {
	var data = google.visualization.arrayToDataTable(smallInfo, true);

    var options = {
        legend: 'none',
        candlestick: {
			fallingColor: { strokeWidth: 0, fill: '#a52714', stroke: '#a52714' }, // red
			risingColor: { strokeWidth: 0, fill: '#0f9d58', stroke: '#0f9d58' }   // green
			},
		series: {
			0:{color: 'green'},
			1:{color: 'red'}
		},
		vAxis : {viewWindow: {min: min, max: max}, gridlines: {count: 8}},
		chartArea:{width:'85%',height:'75%'},		
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chartDiv'));
    chart.draw(data, options);
  }
  
function convertInfo(dict) {
	var keys = [];
	for (key in dict) {
		keys.push(key);
	}
	var arr = [];
	for (key of keys) {
		var tempDate = new Date(key);
		var hour;
		if (chart == 0) {
			hour = tempDate.getHours() + ':' + convertMin(tempDate.getMinutes());
		} else {
			hour = +tempDate.getMonth() + 1 + "-" + tempDate.getDate();
		}
		var info = dict[key];
		var o = info['1. open'];
		var high = info['2. high'];
		var low = info['3. low'];
		var c = info['4. close'];
		var tempArr = [hour, +low, +o, +c, +high];
		arr.push(tempArr);
		changeMinMax(+low, +high);
	}
	
	return reverseArr(arr);
}

function reverseArr(arr) {
	var ans = [];
	for (var i = arr.length - 1; i>= 0; i--) {
		ans.push(arr[i]);
	}
	return ans;
}
function convertMin(min) {
	if (min == 0) {
		return '00';
	} else if (min < 10) {
		return '0' + min;
	} else {
		return '' + min;
	}
}

function changeMinMax(minimum, maximum) {
	if (minimum < min) {
		min = minimum;
	}
	if (maximum > max) {
		max = maximum;
	}
}