var xhttp = new XMLHttpRequest();
var answered_questions;
xhttp.open("GET", "/getInfo", true);
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var json = JSON.parse(this.responseText);
    console.log(json)
    // get username and score and display it
      answered_questions = json.answered_questions;
      var score = json.score;
      var name = json.username;
      console.log(score, name);
  }
};

xhttp.send();

if(answered_questions === 20) {
  // redirect to leaderboard
} else if(answered_questions%5 === 0 && answered_questions !== 20) {
  // redirect to roulette
} else {
  var ques = new XMLHttpRequest();
  ques.open("GET", "/questions/get/request", true);
  ques.setRequestHeader("Content-Type", "application/json");
  ques.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      question = JSON.parse(this.responseText);
    }
  };
  ques.send();
  // redirect to respective reality using answered_question%5
}

function openLeaderboard() {
    var res;
    var req = new XMLHttpRequest();
    req.open("GET", '/leaderboard', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function() {
        if(this.onreadystatechange == 4 && this.status ==200) {
            res = JSON.parse(this.responseText);
            // window.location.href = window.location.href.slice() + '/leaderboard.html';
        }
    }
    req.send(JSON.stringify(data));
}

//
// if (reality == 0) {
//   window.location.href = ("url");
// }
// else if (reality == 1) {
//   window.location.href = ("url");
// }
// else if (reality == 2) {
//   window.location.href = ("url");
// }
// else if (reality == 3) {
//   window.location.href = ("url");
// }
// else if (reality == 4) {
//   window.location.href = ("url");
// }
