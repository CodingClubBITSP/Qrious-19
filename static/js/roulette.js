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
var question;

var realities = ["0","1","2","3"];
function rand(){
	// var playedReality = user.answered_questions / 5;     //change as per object user

		var random = Math.floor(Math.random()*4);
		// do{
		// var check = 0;
		// playedReality.forEach(reality => {
		// 	if(reality == random)
		// 		check = 1;
		// });
		// if (check)
		// 	random++;
		// if(random == 4)
		// 	random = 0;
		// } while(check);

	var choice = Math.floor(Math.random()*2);
	console.log(random);
	var reality=random+1;
	$.ajax({
		type: "POST",
		url: "/reality/get/request",
		dataType: "json",
		data: {"reality":reality}
	});
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
	req.open("GET", '/reality/get/request', true);
	req.setRequestHeader("Content-Type", "application/json");
	req.onreadystatechange = function() {
		if(this.onreadystatechange == 4 && this.status ==200) {
			question = JSON.parse(this.responseText);
			console.log(question);
		}
	}
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
