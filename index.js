
var buttonColours = ["blue","green","red","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level=0;
var answer=1;

$("h1").click(function(){
  if((level==0)){
    nextSequence();
  }
})

function nextSequence(){
  answer=1;
  $("h1").text("level "+level);
  var randomNumber= Math.floor(Math.random()*4);
  randomChosenColour =buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  animation(gamePattern[level]);
  level++;
  userClickedPattern= [];
}


function animation(box){
  var sound = new Audio("sounds/"+box+".mp3");
  sound.play();
  $("div#"+box).toggleClass("pressed");
  setTimeout(function(){$("div#"+box).toggleClass("pressed");},100);
}

$("div.btn").click(function(){
  answer++;
  animation(this.id)
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  var x=checkAnswer(answer-1);
  if(answer>level){
    if(x==1)
    setTimeout(function(){nextSequence();},1000);
  }
});


function checkAnswer(currentlevel){
    for(var i=0;i<currentlevel;i++){
    if (gamePattern[i]!=userClickedPattern[i]){
      startOver();
      return 0
  }}
  return 1;
}


function startOver(){
  $("body").addClass("game-over");
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  setTimeout(function(){$("body").toggleClass("game-over")},200);
  setTimeout(function(){level=0},500);
  answer=1;
  $("h1").text("Game Over, Press Any Key to Restart");
  userClickedPattern=[];
  gamePattern=[];
}
