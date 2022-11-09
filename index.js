
// Define canvas for the schuettelbox
const schuettelbox = document.getElementById("canvas");
const ctx = schuettelbox.getContext("2d");
ctx.translate(400,200);

// Global variables
var cnt = 0;
var delta = 2;
var chosenNumber = +document.getElementById("choseNumber").value;
var firstNumber = Math.floor(Math.random() * (chosenNumber+1));
var secondNumber = chosenNumber - firstNumber;

// Define circles
const coordinatesLeftBox = [
  { x: -50, y: 100},
  { x: -80, y: 100},
  { x: -110, y: 100},
  { x: -140, y: 100},
  { x: -170, y: 100},
  { x: -50, y: 60},
  { x: -80, y: 60},
  { x: -110, y: 60},
  { x: -140, y: 60},
  { x: -170, y: 60}
];
const coordinatesRightBox = [
  { x: 50, y: 100},
  { x: 80, y: 100},
  { x: 110, y: 100},
  { x: 140, y: 100},
  { x: 170, y: 100},
  { x: 50, y: 60},
  { x: 80, y: 60},
  { x: 110, y: 60},
  { x: 140, y: 60},
  { x: 170, y: 60}
];

// Draw schuettelbox frame
function drawBox(){
  //Clear canvas
  ctx.clearRect(0, 0, schuettelbox.width, schuettelbox.height);

  // Draw Schuettelbox rectangle
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.strokeRect(-250, -125, 500, 250);
  // Draw line to separate the two box regions
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 125);
  ctx.stroke();

  // Split up circes randomly
  firstNumber = Math.floor(Math.random() * (chosenNumber+1));
  secondNumber = chosenNumber - firstNumber;
  // Fill left box
  for (var i = 0; i < firstNumber; i++) {
    x = coordinatesLeftBox[i].x;
    y = coordinatesLeftBox[i].y;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  }
  // Fill right box
  for (var i = 0; i < secondNumber; i++) {
    x = coordinatesRightBox[i].x;
    y = coordinatesRightBox[i].y;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
}

//Fill left and right box randomly
function fillBox() {


  // Draw schuettelbox
  drawBox();


  }
}

// Animate Schuettelbox
function animateBox(time){
  //Clear canvas
  ctx.clearRect(-400, -200, schuettelbox.width, schuettelbox.height);

  // Create roation
  //let magnitude = 20;
  //let degPrev = magnitude * Math.sin((time-20)/100);
  //let deg = magnitude * Math.sin(time/100);
  //let delta = deg - degPrev;
  //console.log(delta);

  // Rotate by 5 deg back and forth
  // Change sign after 45
  if (cnt >= 10){
    delta = - delta;
    cnt = 0;
  }
  ctx.rotate(delta * Math.PI / 180);
  drawBox();
  cnt++;
}

// Define event handler for shake button
function shakeBox(){
  // Clear feedback
  var feedback = document.querySelector("#feedback");
  feedback.value = "";

  // Animate Schuettelbox
  // Get current time and define animation frequency
  let startTime = Date.now();
  let animationFrequency = 40;
  let animationDuration = 1640;
  let boxAnimation = setInterval(function(){
    //How much time has passed?
    var timePassed = Date.now() - startTime;
    if (timePassed >= animationDuration){
      clearInterval(boxAnimation);
      return;
    }
    // Draw animation at current time step
    animateBox(timePassed);
  }, animationFrequency);
}

// Handle clicks on shake button
drawBox();
shakeBtn = document.querySelector("#shakeButton");
shakeBtn.addEventListener("click", shakeBox);

// Handle number selction
function updateNumber(){
  // Update display field
  display = document.querySelector("#display");
  display.value = this.value;
  // Update result field
  result = document.querySelector("#result");
  result.value = this.value;
  // Update global variable
  chosenNumber = +document.getElementById("choseNumber").value;
}
numberRange = document.querySelector("#choseNumber");
numberRange.addEventListener("input", updateNumber);

// Check equation
function checkResult(){

  // Fetch values and check whether the equation is true or false
  var num1 = +document.getElementById("num1").value;
  var num2 = +document.getElementById("num2").value;
    
  // Display result
  var feedback = document.querySelector("#feedback");
  if (num1 == firstNumber && num2 == secondNumber){
    // The solution is correct
    feedback.value = "🥳";

  } else{
    feedback.value = "😬";
  }

}
checkBtn = document.querySelector("#checkButton");
checkBtn.addEventListener("click", checkResult);
