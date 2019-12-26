
$("h1").addClass("big-title margin-50");

$("h1").text("Bye!");

$("button").html("<em>Hey!</em>");

$("img").attr("alt", "Image not found!");
$("a").attr("href", "https://www.yahoo.com");


//Event Listeners
$("h1").click(function (){
  $("h1").css("color", "purple");
});

$("h1").on("mouseover", function(){
  $("h1").css("color", "red");
});

$(document).keydown(function(event){
  $("h1").text(event.key);
});

// Adding Elements
$("h1").before("<button>Before</button>");
$("h1").after("<button>After</button>");
$("h1").prepend("<button>Prepend</button>");
$("h1").append("<button>Append</button>");
