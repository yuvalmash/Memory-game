var counter = 0;
var score = 0;
var guesses = 0;
var firstGuess;
var secondGuess;
var before1;
var before2;
var ids;
var i;
var pop = document.getElementById("myModal");
var cont = document.getElementById("mscontainer");
var playIt = document.getElementById("play")


function rookie() {
  var rooky = ["red", "blue", "yellow", "white", "pink", "purple"]
  var newRooky = rooky.concat(rooky);
  newRooky.sort(() => Math.random() - 0.5);
  return newRooky;
}
rookie();

playIt.addEventListener("click", refresh);

function refresh() {
  window.location.reload()
}

function cards() {
  var rookieArr = rookie();
  for (i = 0; i < rookieArr.length; i++) {
    var newCard = document.createElement("div");
    var assign = document.getElementById("mscontainer")
    newCard.classList.add(rookieArr[i])
    newCard.classList.add("down")
    newCard.addEventListener("click", clicking);
    assign.append(newCard);
  }
}
cards();

function clicking(event) {

  if (counter == 0) {
    counter++;
    before = event.target;
    before.removeEventListener('click', clicking);
    firstGuess = before.classList[0];
    console.log("firstGuess: " + firstGuess);
    before1 = switchCard(before);
  }
  else if (counter == 1) {
    counter++;
    before = event.target;
    secondGuess = before.classList[0];
    before2 = switchCard(before);
    console.log("secondGuess: " + secondGuess);
    if (secondGuess == firstGuess) {
      console.log("yes!")
      score = score + 1;
      if (score == 6) {
        counter = 12;
        setTimeout(function () {
          document.getElementById("inText").innerHTML = "You guessed " + guesses + " wrong guesses";
          win()
        }, 1000);
      }
      console.log(before1);
      before2.removeEventListener("click", clicking);
      counter = 0;
    }
    else {
      console.log("nop")
      guesses = guesses + 1;
      $('body').css('pointer-events', 'none');
      setTimeout(function () {
        before1.classList.toggle("down");
        before2.classList.toggle("down");
        $('body').css('pointer-events', '');
      }, 1000);
      counter = 0;
      before1.addEventListener('click', clicking);
    }
  }
}

function switchCard(before) {
  before.classList.toggle("down");
  console.log("before.className=" + before.className)
  return before;
}

function win() {
  cont.style.filter = "blur(20px)";
  pop.style.display = "block";
}

