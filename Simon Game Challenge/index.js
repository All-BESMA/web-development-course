
var level = 0;
var started = false;
var sequence = [];
var buttons = ["green", "red", "yellow", "blue"];
var currentButtonIterator = 0;

$(".btn").on("click", function(event){handleClick(event);});
$(document).on("keydown", function(){start();});


function start(){
  if(started === false){
    reset();
    started = true;
    generate();
  }
}

function reset(){
  level = 0;
  sequence = [];
  started = false;
}

function generate(){
  var rnd = Math.round(Math.random()*3);
  sequence.push(buttons[rnd]);
  playSound(buttons[rnd]);
  animateButton(buttons[rnd]);
  currentButtonIterator = 0;
  $("#level-title").text("Level " + sequence.length);
}

function handleClick(event){
  if(started === false) return;

  var buttonColor = event.currentTarget.id;
  var pressedCorrectButton = checkButton(buttonColor);

  if(pressedCorrectButton){
    playSound(buttonColor);
    animateButton(buttonColor);
  }else{
    playSound("wrong");
  }

  checkGameState(!pressedCorrectButton);
}

function checkButton(buttonColor){
  var pressedCorrectButton = sequence[currentButtonIterator] === buttonColor;
  if(pressedCorrectButton){
    currentButtonIterator += 1;
  }

  return pressedCorrectButton;
}

function checkGameState(lose){
  if(lose){
    finishGame();
  }else if(currentButtonIterator === sequence.length){
    setTimeout(generate, 1000);
  }
}

function finishGame(){
  reset();
  $("#level-title").text("Game Over, Press Any Key to Restart");

  $("body").addClass("red");
  setTimeout(function(){$("body").removeClass("red");}, 200);
}

function animateButton(buttonId){
  $("#"+buttonId).fadeOut(100).fadeIn(100);
}

function playSound(buttonId){
  if(started === false) return;

  switch(buttonId){
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "wrong":
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;

    default:
      console.log("Fuck sound!");
  }
}
