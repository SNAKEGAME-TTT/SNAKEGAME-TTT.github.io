// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
const touchsurface2 = document.getElementById("touchsurface2");
// Return a two dimensional drawing context
const ctx = gameCanvas.getContext("2d");
const ctx1 = touchsurface2.getContext("2d");



let GAME_SPEED =200;
var gs=0;
    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = "lightgreen";
   const SNAKE_COLOUR = 'darkblue'; 
   const SNAKE_COLOUR1 = 'yellow';
    const SNAKE_BORDER_COLOUR = 'darkgreen';
    const FOOD_COLOUR = 'red';
    const FOOD_BORDER_COLOUR = 'darkred';
    var box=20;
    var username="";
    var chk=0;
    if(screen.width>1000)
   { gameCanvas.width=(Math.ceil((screen.width-((28/100)*screen.width))/40))*40;
    gameCanvas.height=Math.ceil((screen.height-((30/100)*screen.height))/40)*40;
   }
    else if(screen.width<screen.height)
    {
    gameCanvas.width=(Math.ceil((screen.width)/40))*40+160;
    gameCanvas.height=(Math.ceil((screen.height)/40))*40+320;
    }
    else{
      gameCanvas.width=(Math.ceil((screen.width-((28/100)*screen.width))/40))*40+40;
    gameCanvas.height=(Math.ceil((screen.height-((30/100)*screen.height))/40))*40+40;
    }

    touchsurface2.width=gameCanvas.width;
    touchsurface2.height=gameCanvas.height;

    // load images

const ground = new Image();
ground.src = "img/bagr.jpeg";
const canb0 = new Image();
canb0.src = "img/b0.jpg";
const canb1 = new Image();
canb1.src = "img/b1.jpg";
const canb2 = new Image();
canb2.src = "img/b2.jpg";
const canb3 = new Image();
canb3.src = "img/b3.jpg";
const canb4 = new Image();
canb4.src = "img/b4.jpg";
const canb5 = new Image();
canb5.src = "img/b5.jpg";
const canb6 = new Image();
canb6.src = "img/b6.jpg";


const foodImg = new Image();
foodImg.src = "img/food.png";
const snakehead_0 = new Image();
snakehead_0.src = "img/hed.png";
const snakehead_1 = new Image();
snakehead_1.src = "img/tail.png";
const snaketail = new Image();
snaketail.src = "img/tail1.png";
const maze = new Image();
maze.src = "img/maze1.jpg";



/*const canb1 = new VideoTrack();
canb1.src = "video/v0.mp4";*/


// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let bg1=new Audio();
let alert1=new Audio();
let alert2=new Audio();
let endplay=new Audio();
let bga=new Audio();
let bgn1=new Audio();


dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
bg1.src="audio/bg2.wav";
alert1.src="audio/alert1.wav";
alert2.src="audio/alert2.wav";
endplay.src="audio/end play.mp3";
bga.src="audio/bga.mp3";
bgn1.src="audio/bgn1.mp3";

    let snake = [
      {x: 0, y: box},
      {x:-box, y: box},
      {x:-2*box, y:box},
      {x:-3*box, y:box},
      {x:-4*box, y:box}
    ]



    // The user's score
    let score = 0;
    // When set to true the snake is changing direction
    let changingDirection = false;
    // Food x-coordinate
    let foodX;
    // Food y-coordinate
    let foodY;
    // Horizontal velocity
    let dx = box;
    // Vertical velocity
    let dy = 0;
    let mazeX;
    let mazeY;
    let maze1X;
    let maze1Y;
    let maze2X;
    let maze2Y;
    let maze3X;
    let maze3Y;
    let maze4X;
    let maze4Y;
    let maze5X;
    let maze5Y;
    let maze6X;
    let maze6Y;

    var mIc=0;
    function myInstructions() {
      window.open("help.html","","width=400,height=700");
      GAME_SPEED=90000000;
      c0=0;
    }

    /**
     * Generates a random number that is a multiple of box given a minumum
     * and a maximum number
     * @param { number } min - The minimum number the random number can be
     * @param { number } max - The maximum number the random number can be
     */
    function randomTen(min, max) {
      return Math.round((Math.random() * (max-min) + min) / box) * box;
    }
    function random1(min, max) {
      return Math.round((Math.random() * (max-min) + min) / box) * box;
    }
  createMaze1();    
  createMaze();
  createMaze2();
  createMaze3();
  createMaze4();
  createMaze5();
  createMaze6();
    function drawMaze() {
       
      ctx.drawImage(maze, mazeX, mazeY,5*box,15*box);
      ctx.drawImage(maze, maze1X, maze1Y,5*box,15*box);
      ctx.drawImage(maze, maze2X, maze2Y,5*box,15*box);
      ctx.drawImage(maze, maze3X, maze3Y,15*box,5*box);
      ctx.drawImage(maze, maze4X, maze4Y,5*box,5*box);
      ctx.drawImage(maze, maze5X, maze5Y,5*box,5*box);
      ctx.drawImage(maze, maze6X, maze6Y,5*box,5*box);
   // ctx.fillStyle = FOOD_COLOUR;
   // ctx.strokestyle = FOOD_BORDER_COLOUR;
   // ctx.fillRect(foodX, foodY, box, box);
    //ctx.strokeRect(foodX, foodY, box, box);
  }

  function createMaze() {
   
    mazeX = random1(gameCanvas.width/2,gameCanvas.width-5*box);
    
    mazeY = random1(3*box,gameCanvas.height/2 - 5*box);
    
  }
  function createMaze1() {
   
    maze1X = random1(box, gameCanvas.width/2 - 5*box);
    
    maze1Y = random1(gameCanvas.height/2, gameCanvas.height-5*box);
    
  }
  function createMaze2() {
   
    maze2X = random1(gameCanvas.width/2 ,gameCanvas.width-10*box);
    
    maze2Y = random1(gameCanvas.height/2, gameCanvas.height-5*box);
    
  }
  function createMaze3() {
   
    maze3X = random1(gameCanvas.width/4 - 5*box,2*gameCanvas.width/4-5*box);
    
    maze3Y = random1(3*box,2*gameCanvas.height/4-5*box);
    
  }
  function createMaze4() {
   
    maze4X = random1(5*box,gameCanvas.width-5*box);
    
    maze4Y = random1(3*box,gameCanvas.height-5*box);
    
  }
  function createMaze5() {
   
    maze5X = random1(5*box,gameCanvas.width-5*box);
    
    maze5Y = random1(3*box,gameCanvas.height-5*box);
    
  }
  function createMaze6() {
   
    maze6X = random1(5*box,gameCanvas.width-5*box);
    
    maze6Y = random1(3*box,gameCanvas.height-5*box);
    
  }



  function didGameEnd() {
    for (let i = 4; i < snake.length; i++)
    {
      if ((snake[i].x === snake[0].x) && (snake[i].y === snake[0].y))
      { 
        alert2.play();
        return true;
      }
    }

    if ((snake[0].x>=mazeX) &&(snake[0].x<=mazeX+4*box)&&(snake[0].y>=mazeY) &&(snake[0].y<=mazeY+14*box))
    { 
      alert2.play();
      return true;
    }
    if ((snake[0].x>=maze1X) &&(snake[0].x<=maze1X+4*box)&&(snake[0].y>=maze1Y) &&(snake[0].y<=maze1Y+14*box))
    { 
      alert2.play();
      return true;
    }
    if ((snake[0].x>=maze2X) &&(snake[0].x<=maze2X+4*box)&&(snake[0].y>=maze2Y) &&(snake[0].y<=maze2Y+14*box))
    { 
      alert2.play();
      return true;
    }
    if ((snake[0].x>=maze3X) &&(snake[0].x<=maze3X+14*box)&&(snake[0].y>=maze3Y) &&(snake[0].y<=maze3Y+4*box))
    { 
      alert2.play();
      return true;
    }
    if ((snake[0].x>=maze4X) &&(snake[0].x<=maze4X+4*box)&&(snake[0].y>=maze4Y) &&(snake[0].y<=maze4Y+4*box))
    { 
      alert2.play();
      return true;
    }
    if ((snake[0].x>=maze5X) &&(snake[0].x<=maze5X+4*box)&&(snake[0].y>=maze5Y) &&(snake[0].y<=maze5Y+4*box))
    { 
      alert2.play();
      return true;
    }
    if ((snake[0].x>=maze6X) &&(snake[0].x<=maze6X+4*box)&&(snake[0].y>=maze6Y) &&(snake[0].y<=maze6Y+4*box))
    { 
      alert2.play();
      return true;
    }


    const hitLeftWall = snake[0].x <=-2;
   const hitRightWall = snake[0].x >= gameCanvas.width ;
  const hitToptWall = snake[0].y <=-2;
   const hitBottomWall = snake[0].y >= gameCanvas.height ;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
  }

    
    

    function setCookie(cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    
    function checkCookie() {
      var user=getCookie("username");
      username=getCookie("username");
      if (user != "") {
        alert("Welcome again " + user +  "!😎  Yo!\nStart your 🐍 game😀?\n\n\nP.S: "+user+", to enjoy the GAMEPLAY to the fullest,please gothrough the instructions(leftmost) carefully especially if you are playing this GAME/LEVEL for the FIRST TIME.\nThankyou🙂!");
        main();
      }
      
      else {
         user = prompt("Please enter your name🙂:","");
         if (user != "" && user != null) {
           setCookie("username", user, 30);
          alert("Hola "+user+"!😎  Yo!\nStart your 🐍 game😀?\n\n\nP.S: "+user+", to enjoy the GAMEPLAY to the fullest,please gothrough the instructions(leftmost) carefully especially if you are playing this GAME/LEVEL for the FIRST TIME.\nThankyou🙂!");
          main();
         }
         else{
           alert("Hola amigo!😎  Yo!\nStart your 🐍 game😀?\n\n\nP.S: AMIGO, to enjoy the GAMEPLAY to the fullest,please gothrough the instructions(leftmost) carefully especially if you are playing this GAME/LEVEL for the FIRST TIME.\nThankyou🙂!");
           main();
         }
      }
    }

    //var person = prompt("Please enter your name", "Harry Potter");


     //Start game
     var elem = document.getElementById("html");
     function openFullscreen() {
       if(screen.width>1000)
       {
       if (elem.requestFullscreen) {
         elem.requestFullscreen();
       } else if (elem.mozRequestFullScreen) { /* Firefox */
         elem.mozRequestFullScreen();
       } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
         elem.webkitRequestFullscreen();
       } else if (elem.msRequestFullscreen) { /* IE/Edge */
         elem.msRequestFullscreen();
       }
      }
     }

     function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
     
     var slider = document.getElementById("myRange");
     var output = document.getElementById("demo");
     output.innerHTML = slider.value;
     
     slider.oninput = function() {
       output.innerHTML = this.value;
       GAME_SPEED=400-(4*slider.value);
       
       
        
        // Call game again
      
     }

    /* var slider1 = document.getElementById("myRange1");
     var output1 = document.getElementById("demo1");
     output1.innerHTML = slider1.value;
     
     slider1.oninput = function() {
       output1.innerHTML = this.value;
      if(slider1.value==1)
      {box=4;}
      if(slider1.value==2)
      {box=8;}
      if(slider1.value==3)
      {box=10;}
      if(slider1.value==4)
      {box=20;}
      if(slider1.value==5)
     {box=40;}
      
     
      createFood();
      
        // Call game again
      
     }

     var slider2 = document.getElementById("myRange2");
     var output2 = document.getElementById("demo2");
     output2.innerHTML = slider2.value;
     
     slider2.oninput = function() {
       output2.innerHTML = this.value;
       gameCanvas.width=40*slider2.value;
       touchsurface2.width=gameCanvas.width;
       createFood();
       
     }
     var slider3 = document.getElementById("myRange3");
     var output3 = document.getElementById("demo3");
     output3.innerHTML = slider3.value;
     
     slider3.oninput = function() {
       output3.innerHTML = this.value;
       gameCanvas.height=40*slider3.value;
       touchsurface2.height=gameCanvas.height;
       
       createFood();
       
        // Call game again
      
     }
*/
    


function ontouch(el, callback){
 
  var touchsurface = el,
  dir,
  swipeType,
  startX,
  startY,
  distX,
  distY,
  threshold = 150, //required min distance traveled to be considered swipe
  restraint = 100, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 500, // maximum time allowed to travel that distance
  elapsedTime,
  startTime,
  handletouch = callback || function(evt, dir, phase, swipetype, distance){}

  touchsurface.addEventListener('touchstart', function(e){
      var touchobj = e.changedTouches[0]
      dir = 'none'
      swipeType = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      handletouch(e, 'none', 'start', swipeType, 0) // fire callback function with params dir="none", phase="start", swipetype="none" etc
      e.preventDefault()

  }, false)

  touchsurface.addEventListener('touchmove', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      if (Math.abs(distX) > Math.abs(distY)){ // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
          dir = (distX < 0)? 'left' : 'right'
          handletouch(e, dir, 'move', swipeType, distX) // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
      }
      else{ // else consider this a vertical movement
          dir = (distY < 0)? 'up' : 'down'
          handletouch(e, dir, 'move', swipeType, distY) // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
      }
      e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  touchsurface.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0]
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipeType = dir // set swipeType to either "left" or "right"
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipeType = dir // set swipeType to either "top" or "down"
          }
      }
      // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
      handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY)
      e.preventDefault()
  }, false)
}

// USAGE:
/*
ontouch(el, function(evt, dir, phase, swipetype, distance){
// evt: contains original Event object
// dir: contains "none", "left", "right", "top", or "down"
// phase: contains "start", "move", or "end"
// swipetype: contains "none", "left", "right", "top", or "down"
// distance: distance traveled either horizontally or vertically, depending on dir value

if ( phase == 'move' && (dir =='left' || dir == 'right') )
console.log('You are moving the finger horizontally by ' + distance)
})
*/


window.addEventListener('load', function(){
  var el = document.getElementById('touchsurface2')
  ontouch(el, function(evt, dir, phase, swipetype, distance){
      var touchreport = ''
      touchreport += '<b>Direction:</b> ' + dir + '<br />';
      //touchreport += '<b>Phase:</b> ' + phase + '<br />'
      //touchreport += '<b>Swipe Type:</b> ' + swipetype + '<br />'
      //touchreport += '<b>Distance:</b> ' + distance + '<br />'
      el.innerHTML = touchreport;

    const goingUp0 = dy === -box;
    const goingDown0 = dy === box;
    const goingRight0 = dx === box;
    const goingLeft0 = dx === -box;
      
      if ((dir=='up') && !goingDown0&& !goingUp0) {
        up.play();
        dx = 0;
        dy = -box;
      }

      if ((dir=='left') && !goingRight0&& !goingLeft0) {
        left.play();
        dx = -box;
        dy = 0;
      }
      if ((dir=='right') && !goingLeft0&& !goingRight0) {
        right.play();
        dx = box;
        dy = 0;
      }
      if ((dir=='down') && !goingUp0&& !goingDown0) {
        down.play();
        dx = 0;
        dy = box;
      }
     


  })
}, false)

var o1 = document.getElementById("demo4");
var o2 = document.getElementById("demo5");
function myFunction1(){
      chk=1;
      
 o1.innerHTML = "ON ✔";
 o2.innerHTML = "OFF";
 GAME_SPEED=0;
 slider.value=100;
 output.innerHTML = slider.value;
 output.innerHTML = this.value;
}
function myFunction2(){
  chk=0;
  
  o1.innerHTML = "ON";
  o2.innerHTML = "OFF✔";
  GAME_SPEED=200;
  slider.value=50;
  output.innerHTML = slider.value;
  output.innerHTML = this.value;
}


function myFunction(){

  const goingUp1 = dy === -box;
  const goingDown1 = dy === box;
  const goingRight1 = dx === box;
  const goingLeft1 = dx === -box;


  const bhitLeftWall = snake[0].x <=2*box;
     const bhitRightWall = snake[0].x >= gameCanvas.width-2*box ;
    const bhitToptWall = snake[0].y <=2*box;
     const bhitBottomWall = snake[0].y >= gameCanvas.height-2*box ;

if(bhitLeftWall&&goingLeft1)
{
    if(snake[0].y<=gameCanvas.height/2){
        down.play();
        dx = 0;
        dy = box;
    }
    else{
        
        up.play();
        dx = 0;
        dy = -box;
    }
}
if(bhitRightWall&&goingRight1)
{
    if(snake[0].y<=gameCanvas.height/2){
        down.play();
        dx = 0;
        dy = box;
    }
    else{
        
        up.play();
        dx = 0;
        dy = -box;
    }
}
if(bhitToptWall&&goingUp1)
{
    if(snake[0].x<=gameCanvas.width/2){
        right.play();
        dx = box;
        dy = 0;
    }
    else{
        left.play();
        dx = -box;
        dy = 0;
    }
}
if(bhitBottomWall&&goingDown1)
{
    if(snake[0].x<=gameCanvas.width/2){
        right.play();
        dx = box;
        dy = 0;
    }
    else{
        left.play();
        dx = -box;
        dy = 0;
    }
}


   
    for (let i = 4; i < snake.length; i++)
      {
        if ( ( (snake[i].x-box === snake[0].x)||(snake[i].x+box === snake[0].x)||(snake[i].x === snake[0].x) )&&( (snake[i].y-box === snake[0].y)||(snake[i].y+box === snake[0].y)||(snake[i].y === snake[0].y) ) )
        { 
          alert2.play();
          if((snake[i].y-box === snake[0].y)&& goingDown1&&(snake[i].x === snake[0].x))
          {
            {
            dx = -box;
            dy = 0;
            }
          }
         
          if((snake[i].y+box === snake[0].y)&& goingUp1&&(snake[i].x === snake[0].x))
          {
            {
            dx = box;
            dy = 0;
            }
          }
         
          if((snake[i].x-box === snake[0].x)&& goingRight1&&(snake[i].y === snake[0].y)){      
            {
            dx = 0;
            dy = box;
            }
          }
         
          if((snake[i].x+box === snake[0].x)&& goingLeft1&&(snake[i].y === snake[0].y)){
            {
            dx = 0;
            dy = -box;
            }
          }
         
        }
        else /*if(foodX===snake[0].x&&foodY===snake[0].y/*&&!(          ( ((snake[0].x==snake[i].x+box)||(snake[0].x==snake[i].x-box))&&((snake[1].x==snake[i-1].x+box)||(snake[1].x==snake[i-1].x-box)||(snake[1].x==snake[i+1].x+box)||(snake[1].x==snake[i+1].x-box)) ) ||     ( ((snake[0].y==snake[i].y+box)||(snake[0].y==snake[i].y-box))&&((snake[1].y==snake[i-1].y+box)||(snake[1].y==snake[i-1].y-box)||(snake[1].y==snake[i+1].y+box)||(snake[1].y==snake[i+1].y-box)) )     )               )*/{
          if(snake[0].y===foodY)
          {   
              if ( (snake[0].x > foodX)&& !goingRight1&&!goingLeft1)
              {alert2.play();
               dx = -box;
               dy = 0;
               continue;
              }
       
              else if( (snake[0].x < foodX)&& !goingLeft1&&!goingRight1) {
                alert2.play();
               dx = box;
               dy = 0;continue;
              }
           }
       
           else if(snake[0].x===foodX)
           { 
             if ((snake[0].y > foodY)&& !goingDown1&&!goingUp1) {
              
              alert2.play();
               dx = 0;
               dy = -box;continue;
             }
             
             else if((snake[0].y < foodY)&& !goingUp1&&!goingDown1) {
               
              alert2.play();
               dx = 0;
               dy = box;continue;
             }
           }
       
       
        }
      }
   
  }

   
    // Create the first food location
    createFood();
    
    // Call changeDirection whenever a key is pressed
    document.addEventListener("keydown", changeDirection);
   
    /**
     * Changes the vertical and horizontal velocity of the snake according to the
     * key that was pressed.
     * The direction cannot be switched to the opposite direction, to prevent the snake
     * from reversing
     * For example if the the direction is 'right' it cannot become 'left'
     * @param { object } event - The keydown event
     */
    function changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      /**
       * Prevent the snake from reversing
       * Example scenario:
       * Snake is moving to the right. User presses down and immediately left
       * and the snake immediately changes direction without taking a step down first
       */
      if (changingDirection) return;
      changingDirection = true;
       
      const keyPressed = event.keyCode;

      const goingUp = dy === -box;
    const goingDown = dy === box;
    const goingRight = dx === box;
    const goingLeft = dx === -box;
      
     

      if (((keyPressed === LEFT_KEY)||(keyPressed === 65)) && !goingRight&& !goingLeft) {
        left.play();
        dx = -box;
        dy = 0;

      }
      if (((keyPressed === UP_KEY)||(keyPressed === 87)) && !goingDown&& !goingUp) {
        up.play();
        dx = 0;
        dy = -box;
      }
      if (((keyPressed === RIGHT_KEY)||(keyPressed === 68)) && !goingLeft&& !goingRight) {
        right.play();
        dx = box;
        dy = 0;
      }
      if (((keyPressed === DOWN_KEY)||(keyPressed === 83)) && !goingUp&& !goingDown) {
        down.play();
        dx = 0;
        dy = box;
      }
 
    }


    /**
     * Main function of the game
     * called repeatedly to advance the game
     */
     
     //const hitLeftWall = snake[0].x <=-2;
     // const hitRightWall = snake[0].x >= gameCanvas.width ;
      //const hitToptWall = snake[0].y <=-2;
     // const hitBottomWall = snake[0].y >= gameCanvas.height ;
     function onTick() {
        
      changingDirection = false ;
      clearCanvas();
      drawFood();
      advanceSnake();
      drawSnake();
      drawMaze();
      if(chk===1){
        myFunction();
      }
      gs=GAME_SPEED;
      // Call game again
      main();
    }

    
    function main() {
      
       /*if(screen.width>1000)
      openFullscreen();*/
      
      
     /*if( abouttoEndGamex()){
       alert1.play();
     }*/
      // If the game ended return early to stop game
      if (didGameEnd()){ 
        alert1.play();
        if(main1()){
          main6();       
        }     
        }
        /*if(chk===1)
        {
          endplay.pause();
          bga.play();
          bgn1.pause();
        }*/
        if(chk===0)
        {
          endplay.pause();
          bga.pause();
          bgn1.play();
        }
       
        /*document.getElementById("demo4").onclick = function() {myFunction1()};
        document.getElementById("demo5").onclick = function() {myFunction2()};*/
        gs=GAME_SPEED;
        document.getElementById("demo6").onclick = function() {main4()};
        document.getElementById("demo7").onclick = function() {main5()};
      setTimeout(onTick,GAME_SPEED);
    }
    

    function main1()
    {
      
          if(score>=100)
          alert("This is truly above and beyond.😍😎 "+username);
          else if(score>=80)
          alert("You set a high bar with this one.😎 "+username);
          else if(score>=50)
          alert("BRILLIANT gameplay!☺😊☺ "+username);
          else if(score>=25)
          alert("Very good gameplay!😀 "+username);
          else if(score>=10)
          alert("good gameplay!🙂 "+username);
          else
          alert("good gameplay! "+username+" ,can do better😉");
          
         alert("Game Over😌!\n\nSelect NEW to play again🤗 \n\nThankyou! You are such a Good Player😘");
         
        return true;
          
    }
      
       var c0=0;
       function main4(){
         GAME_SPEED=400-(4*slider.value);;
         if(c0===0)
         {
           main();
           c0=1
         }
       
     }
     function main5(){       
      endplay.play();
      bga.pause();
      bgn1.pause();
       GAME_SPEED=9000000;
       c0=0; 
   }
   function myppop() {
    var popup = document.getElementById("demo7");
    popup.classList.toggle("show");
  }

    function main6(){
      endplay.play();
      bga.pause();
      bgn1.pause();
       main6();
    }


    /**
     * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
     * draw a border around it
     */
    function clearCanvas() {
      if(chk===1)
      ctx.drawImage(ground, 0, 0,gameCanvas.width,gameCanvas.height);
      if(score>65)
      ctx.drawImage(canb6, 0, 0,gameCanvas.width,gameCanvas.height);
      else if(score>50)
      ctx.drawImage(canb4, 0, 0,gameCanvas.width,gameCanvas.height);

      else if(score>40)
      {
        ctx.drawImage(canb5, 0, 0,gameCanvas.width,gameCanvas.height);
      
      }
      else if(score>30)
        ctx.drawImage(canb0, 0, 0,gameCanvas.width,gameCanvas.height);
        else if(score>15)
        ctx.drawImage(canb3, 0, 0,gameCanvas.width,gameCanvas.height);
        else if(score>5)
        ctx.drawImage(canb2, 0, 0,gameCanvas.width,gameCanvas.height);
        else if(score>75)
        ctx.drawImage(canb0, 0, 0,gameCanvas.width,gameCanvas.height);
        else if(score>85)
        ctx.drawImage(canb4, 0, 0,gameCanvas.width,gameCanvas.height);
  
        else if(score>95)
        {
          ctx.drawImage(canb5, 0, 0,gameCanvas.width,gameCanvas.height);
        
        }
        else if(score>100)
          ctx.drawImage(canb3, 0, 0,gameCanvas.width,gameCanvas.height);
          else if(score>111)
          ctx.drawImage(canb0, 0, 0,gameCanvas.width,gameCanvas.height);
          else if(score>130)
          ctx.drawImage(canb2, 0, 0,gameCanvas.width,gameCanvas.height);
          else
          ctx.drawImage(canb1, 0, 0,gameCanvas.width,gameCanvas.height);
  


    }

    /**
     * Draw the food on the canvas
     */
    function drawFood() {
       
        ctx.drawImage(foodImg, foodX, foodY,box,box);
     // ctx.fillStyle = FOOD_COLOUR;
     // ctx.strokestyle = FOOD_BORDER_COLOUR;
     // ctx.fillRect(foodX, foodY, box, box);
      //ctx.strokeRect(foodX, foodY, box, box);
    }

    

    /**
     * Advances the snake by changing the x-coordinates of its parts
     * according to the horizontal velocity and the y-coordinates of its parts
     * according to the vertical veolocity
     */
      
    function advanceSnake() {

      const hitLeftWall = snake[0].x <=0;
      const hitRightWall = snake[0].x >= gameCanvas.width ;
      const hitToptWall = snake[0].y <=0;
      const hitBottomWall = snake[0].y >= gameCanvas.height ;


     
      // Create the new Snake's head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      // Add the new head to the beginning of snake body
      snake.unshift(head);

      const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
      if (didEatFood) {
          eat.play();
        // Increase score
        score += 3;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        
        // Generate new food location
        createFood();
       
      } else if(!didEatFood){
        // Remove the last part of snake body
        snake.pop();
      }
     
      
    }
   
   
    /**
     * Returns true if the head of the snake touched another part of the game
     * or any of the walls
     */
     
      
   /* function abouttoEndGamex()
   {
      for (let i = 4; i < snake.length; i++)
      {
        const hitx=(snake[i].x === (snake[0].x-box)||(snake[0].x+box));
        const hit0=( (  (snake[i].x -box === snake[0].x) || (snake[i].x + box === snake[0].x)  )   && (  (snake[i].y - box === snake[0].y) || (snake[i].y + box === snake[0].y)    ) );
        if (hit0)
        { 
          return true;
        }
       
      }
    }

      function abouttoEndGamey()
     {
        for (let i = 4; i < snake.length; i++)
        {
          const hity=snake[i].y === ( (snake[0].y-40)||(snake[0].y+40) ) ;
          if (hity)
          { 
            
            return true;
          }
         
        }


      }*/
     
    
    

    /**
     * Creates random set of coordinates for the snake food.
     */
    function createFood() {
      // Generate a random number the food x-coordinate
      foodX = randomTen(3*box, gameCanvas.width - 3*box);
      // Generate a random number for the food y-coordinate
      foodY = randomTen(3*box, gameCanvas.height - 3*box);

      if ((foodX>=mazeX) &&(foodX<=mazeX+5*box)&&(foodY>=mazeY) &&(foodY<=mazeY+15*box))
      { 
        createFood();
      }
      if ((foodX>=maze1X) &&(foodX<=maze1X+5*box)&&(foodY>=maze1Y) &&(foodY<=maze1Y+15*box))
      { 
        createFood();
      }
      if ((foodX>=maze2X) &&(foodX<=maze2X+5*box)&&(foodY>=maze2Y) &&(foodY<=maze2Y+15*box))
      { 
        createFood();
      }
      if ((foodX>=maze3X) &&(foodX<=maze3X+15*box)&&(foodY>=maze3Y) &&(foodY<=maze3Y+5*box))
      { 
        createFood();
      }
      if ((foodX>=maze4X) &&(foodX<=maze4X+5*box)&&(foodY>=maze4Y) &&(foodY<=maze4Y+5*box))
      { 
        createFood();
      }
      if ((foodX>=maze5X) &&(foodX<=maze5X+5*box)&&(foodY>=maze5Y) &&(foodY<=maze5Y+5*box))
      { 
        createFood();
      }
      if ((foodX>=maze6X) &&(foodX<=maze6X+5*box)&&(foodY>=maze6Y) &&(foodY<=maze6Y+5*box))
      { 
        createFood();
      }

      // if the new food location is where the snake currently is, generate a new food location
      snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) {createFood();}
      });
    }
    
    
    

    /**
     * Draws the snake on the canvas
     */
    function drawSnake() {
      // loop through the snake parts drawing each part on the canvas
      snake.forEach(drawSnakePart)
    }

    /**
     * Draws a part of the snake on the canvas
     * - The coordinates where the part should be drawn
     */
    function drawSnakePart() {
      /*if(score==0)
      ctx.drawImage(snakehead_0, snakePart.x, snakePart.y, box, box);
      else
      ctx.drawImage(snakehead_1, snakePart.x, snakePart.y, box, box);*/
      for( let i = 0; i < snake.length ; i++){
        if(i==0){
          ctx.drawImage(snakehead_0, snake[i].x, snake[i].y, box, box);
        }
        
        else
        ctx.drawImage(snakehead_1, snake[i].x, snake[i].y, box, box);

    }

      // Set the colour of the snake part
     // if(score%2==0)ctx.fillStyle = SNAKE_COLOUR1;
     // else
     // ctx.fillStyle = SNAKE_COLOUR;

      // Set the border colour of the snake part
      //ctx.strokestyle = SNAKE_BORDER_COLOUR;

      // Draw a "filled" rectangle to represent the snake part at the coordinates
      // the part is located
      //ctx.fillRect(snakePart.x, snakePart.y, box, box);

      // Draw a border around the snake part
      //ctx.strokeRect(snakePart.x, snakePart.y, box, box);
    }
  