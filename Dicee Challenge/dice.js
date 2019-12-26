var rnd1 = Math.round(Math.random()*5)+1;
var rnd2 = Math.round(Math.random()*5)+1;

var player1 = document.querySelector(".img1");
var player2 = document.querySelector(".img2");
var h1 = document.querySelector("h1");

player1.setAttribute("src", "images/dice" + rnd1 + ".png");
player2.setAttribute("src", "images/dice" + rnd2 + ".png");

if(rnd1 == rnd2) h1.textContent = "Draw"
else h1.textContent = "Player " + (rnd1 > rnd2 ? "1" : "2") + " wins!";
