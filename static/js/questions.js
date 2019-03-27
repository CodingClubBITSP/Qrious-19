
var counter;
$(document).ready(function () {
    $(".question").addClass("animated fadeInRightBig");
    $(".options").addClass("animated fadeInLeftBig");
    $(".lowbtn").addClass("animated fadeInLeftBig");
   $(function(){

       $(".options").on("click", function(){
         console.log('selected');
         $(".options").removeClass("selected");
         $(this).addClass("selected");
       });

     });
      var question;
    	var req = new XMLHttpRequest();
    	req.open("GET", '/questions/reality/request', true);
    	req.setRequestHeader("Content-Type", "application/json");
    	req.onreadystatechange = function() {
    		if(this.readyState == 4 && this.status ==200) {
    			question = JSON.parse(this.responseText);
          counter = question.question_number;
          document.getElementById('ques').innerHTML = question.question;
          document.getElementById('option1').innerHTML = question.option1;
          document.getElementById('option2').innerHTML = question.option2;
          document.getElementById('option3').innerHTML = question.option3;
          document.getElementById('option4').innerHTML = question.option4;
    		}
    	}
    	req.send();
   });

   $(".options").on("click", function(){
     console.log('selected');
     $(".options").removeClass("selected");
     $(this).addClass("selected");
   });
  function loadQuestion(){
       $(".options").removeClass("selected");
       counter = question.question_number;
       document.getElementById('ques').innerHTML = question.question;
       document.getElementById('option1').innerHTML = question.option1;
       document.getElementById('option2').innerHTML = question.option2;
       document.getElementById('option3').innerHTML = question.option3;
       document.getElementById('option4').innerHTML = question.option4;
   }
   // console.log(question);
   function SkipOption() {
         var data = {
           "question": counter,
           "answer": 'NULL ANSWER'
         };
         function getCookie(name) {
           var cookieValue = null;
             if (document.cookie && document.cookie !== '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                     if (cookie.substring(0, name.length + 1) === (name + '=')) {
                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                         break;
                     }
                 }
             }
             return cookieValue;
         }
         var csrftoken = getCookie('csrftoken');
         $.ajaxSetup({
           beforeSend: function(xhr, settings) {
               xhr.setRequestHeader("X-CSRFToken", csrftoken);
           }
         });
         if(counter%5==0 && counter!=0)window.location.href='roulette.html';
         $.ajax({
           type: "POST",
           url: "/answer/ajax/post",
           dataType: "json",
           data: data,
           async:false
         });
         var req = new XMLHttpRequest();
         req.open("GET", '/questions/reality/request', false);
         req.setRequestHeader("Content-Type", "application/json");
         req.onreadystatechange = function() {
           if(this.readyState == 4 && this.status ==200) {
             // if(counter%5 === 0) {
             //   console.log('Next reality!');
             //   var url = window.location.href;
             //   // window.location.href =
             //
             question = JSON.parse(this.responseText);
             score = JSON.parse(question.score);
             // append in html
             console.log(question);
             document.getElementById("marks").innerHTML="Score :"+score;
             loadQuestion();
           }
         }
         req.send(JSON.stringify(data));
}

  function SubmitOption() {
      document.getElementById("submit").click();
      var ans = document.getElementsByClassName("selected")[0].innerHTML;
      console.log(ans);
      if(!ans) {
        document.getElementsByClassName('alert')[0].style.animation = 'showAlert 2s ease-in-out';
      }

      var data = {
        "question": counter,
        "answer": ans
      };
      $(".options").removeClass("selected");
      function getCookie(name) {
        var cookieValue = null;
          if (document.cookie && document.cookie !== '') {
              var cookies = document.cookie.split(';');
              for (var i = 0; i < cookies.length; i++) {
                  var cookie = jQuery.trim(cookies[i]);
                  // Does this cookie string begin with the name we want?
                  if (cookie.substring(0, name.length + 1) === (name + '=')) {
                      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                      break;
                  }
              }
          }
          return cookieValue;
      }
      var csrftoken = getCookie('csrftoken');
      $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      });
      if(counter%5==0 && counter!=0)window.location.href='roulette.html';
      $.ajax({
        type: "POST",
        url: "/answer/ajax/post",
        dataType: "json",
        data: data,
        async:false
      });
      var req = new XMLHttpRequest();
      req.open("GET", '/questions/reality/request', false);
      req.setRequestHeader("Content-Type", "application/json");
      req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status ==200) {
          // if(counter%5 === 0) {
          //   console.log('Next reality!');
          //   var url = window.location.href;
          //   // window.location.href =
          //
          question = JSON.parse(this.responseText);
          score = JSON.parse(question.score);
          // append in html
          console.log(question);
          document.getElementById("marks").innerHTML="Score :"+score;
          loadQuestion();
        }
      }
      console.log(ans);
      req.send(JSON.stringify(data));
      console.log(data);
  }


   {
    function openNav()
    {
       document.getElementById('nav').style.height = "100%";

    }
    function closeNav()
    {
       document.getElementById('nav').style.height = "0%";

    }

    function toggleSidebar(ref) {
   ref.classList.toggle('active');
   document.getElementById('sidebar').classList.toggle('active');

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

 window.addEventListener('resize', function(){
  if(screen.width === window.innerWidth){
     $('.final').toggleClass('active');
     $('.close').toggleClass('active');
}
});


}
