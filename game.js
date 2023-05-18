var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if(!started) {
  $("#level-title").text("Level "+level);
  nextSequence();
  started =true;
  
  }
});
 

$(".btn").on("click", function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

/*$(".btn").on("click",function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
  }); 


var userChosenColor = $(this).attr("id"); found this on Q and A and given by Angela.

Angela answer in which I found a bug. 

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function()  {
        nextSequence();
      }, 1000);
     
    }
  }
  else {
    console.log("wrong");
  
    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("game over");
}
}
*/
function checkAnswer(currentLevel){
let match = true; // Assume all elements match initially

for (let i = 0; i < userClickedPattern.length; i++) {
  if (gamePattern[i] !== userClickedPattern[i]) {
    match = false; // Found a mismatch, set match to false
     //break;(not necessary) Exit the loop since there is already a mismatch
  }
}

if (match) {
  console.log("success");

  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
} else {
  console.log("Mismatch in patterns, handle incorrect click");
    playsound("wrong");
    $("body").addClass("game-over");
     setTimeout(function() {
     $("body").removeClass("game-over")
     }, 200);
   $("#level-title").text("game-over, press any key to restart");
   startOver();
}
}


function nextSequence(){
  
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
    animatePress(randomChosenColor);
    
}

function playsound(name){
  var audio = new Audio ("sounds/" +name+ ".mp3");
  audio.play();
}

function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout (function(){
      $("#"+currentcolor).removeClass("pressed");
    },100);
  }


function startOver(){
  level = 0;
  gamePattern= [];
  started = false;
  
}

