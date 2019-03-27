document.addEventListener('DOMContentLoaded', function() {
 var elems = document.querySelectorAll('.fixed-action-btn');
 var instances = M.FloatingActionButton.init(elems, {
	 direction: 'left',
	 hoverEnabled: false
 });
});
var question1 = document.getElementsByClassName('question1')[0];
var question2 = document.getElementsByClassName('question2')[0];
var question3 = document.getElementsByClassName('question3')[0];
var question4 = document.getElementsByClassName('question4')[0];
var question,random;

var realities = ["0","1","2","3"];
function rand(){
	// var playedReality = user.answered_questions / 5;     //change as per object user
var choice=Math.floor(Math.random()*2);

// $.ajax({
//   type: "POST",
//   url: "/reality/get/request",
//   dataType: "json",
//   data: {"reality":1},
//   async:false
// });
  var req = new XMLHttpRequest();
  req.open("POST", '/reality/get/request', false);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status ==200) {
      // if(counter%5 === 0) {
      //   console.log('Next reality!');
      //   var url = window.location.href;
      //   // window.location.href =
      //
      random = JSON.parse(this.responseText).reality;
      // append in html
      console.log("iwuebiubf");
    }
    else{
      console.log("error");
    }
  }
  req.send();
	if(random == 0){
		if(choice == 0){
			document.getElementById('roulette').style.transform = "rotate(2497.5deg)";
		}
		else{
			document.getElementById('roulette').style.transform = "rotate(2677.5deg)";
		}
		setTimeout(function(){
			sendRequest(realities[random]);
			window.location.href+='/mythologydes.html';
			// question1.style.transform = "scale(1)";
		},5500);
	}
	else if(random == 1){
		if(choice == 0){
			document.getElementById('roulette').style.transform = "rotate(2632.5deg)";
		}
		else{
			document.getElementById('roulette').style.transform = "rotate(2812.5deg)";
		}
		sendRequest(realities[random]);
		setTimeout(function(){
			window.location.href= window.location.href + '/magicdes.html';
		},5500)
	}
	else if(random == 2){
		if(choice == 0){
			document.getElementById('roulette').style.transform = "rotate(2587.5deg)";
		}
		else{
			document.getElementById('roulette').style.transform = "rotate(2767.5deg)";
		}
		sendRequest(realities[random]);
		setTimeout(function(){
			window.location.href= window.location.href +'/roboticdes.html';
			// question3.style.transform = "scale(1)";
		},5500)
	}
	else if(random == 3){
		if(choice == 0){
			document.getElementById('roulette').style.transform = "rotate(2542.5deg)";
		}
		else{
			document.getElementById('roulette').style.transform = "rotate(2722.5deg)";
		}
		sendRequest(realities[random]);
		setTimeout(function(){
			window.location.href+='/gamingdes.html';
			// question4.style.transform = "scale(1)";
		},5500)
	}
	console.log(random);
}

function sendRequest(reality) {
	var data = {
		"reality": reality,
	};
	var req = new XMLHttpRequest();
	req.open("GET", '/questions/reality/request', true);
	req.setRequestHeader("Content-Type", "application/json");
	req.onreadystatechange = function() {
		if(this.onreadystatechange == 4 && this.status ==200) {
			question = JSON.parse(this.responseText);
			console.log(question);
		}
	}
  req.send();
  console.log(question);
}

  function stop() {
	  document.getElementById('roulette').classList.add('second');
  }
function openNav()
    {
       document.getElementById('nav').style.height = "100%";
    }
function closeNav()
    {
       document.getElementById('nav').style.height = "0%";
    }
function toggleFullScreen() {
   if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
     if (document.documentElement.requestFullScreen) {
       document.documentElement.requestFullScreen();
     } else if (document.documentElement.mozRequestFullScreen) {
       document.documentElement.mozRequestFullScreen();
     } else if (document.documentElement.webkitRequestFullScreen) {
       document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
     }
   } else {
     if (document.cancelFullScreen) {
       document.cancelFullScreen();
     } else if (document.mozCancelFullScreen) {
       document.mozCancelFullScreen();
     } else if (document.webkitCancelFullScreen) {
       document.webkitCancelFullScreen();
     }
   }
 }
