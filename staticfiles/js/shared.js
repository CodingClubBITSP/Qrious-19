
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
