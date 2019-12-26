document.querySelectorAll("button").forEach((button) => {button.addEventListener("click", function() {
    handleClick(button);
  });
});

document.addEventListener("keydown", function(event){
    console.log(event)
    playDrum(event.key);
    buttonAnimation(event.key);
  }
);

function handleClick(button){
  playDrum(button.textContent);
  buttonAnimation(button.textContent);
}

function playDrum(drum){
  switch (drum){
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default:
      console.log("Undefined drumkey.");
  }
}

function buttonAnimation(key){
  var buttonPressed = document.querySelector("." + key);

  if(buttonPressed !== undefined){
    buttonPressed.classList.add("pressed");
    setTimeout(function(){buttonPressed.classList.remove("pressed");}, 200);
  }
}
