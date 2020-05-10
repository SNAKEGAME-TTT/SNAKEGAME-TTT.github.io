let GAME_SPEED =100;

    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = "lightgreen";
   const SNAKE_COLOUR = 'darkblue'; 
   const SNAKE_COLOUR1 = 'yellow';
    const SNAKE_BORDER_COLOUR = 'darkgreen';
    const FOOD_COLOUR = 'red';
    const FOOD_BORDER_COLOUR = 'darkred';
    var box=20;
    var username="";

    // load images

const ground = new Image();
ground.src = "img/1.jfif";

const foodImg = new Image();
foodImg.src = "img/food.png";
const snakehead_0 = new Image();
snakehead_0.src = "img/snakehead.gif";
const snakehead_1 = new Image();
snakehead_1.src = "img/snakehead1.gif";


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

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
bg1.src="audio/bg1.wav";
alert1.src="audio/alert1.wav";
alert2.src="audio/alert2.wav";

    let snake = [
      {x: 240, y: 80},
      {x: 220, y: 60},
      {x: 200, y: 40},
      {x: 180, y: 20},
      {x: 160, y: 0}
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

      
  

    
    // Get the canvas element
    const gameCanvas = document.getElementById("gameCanvas");
    // Return a two dimensional drawing context
    const ctx = gameCanvas.getContext("2d");


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
        alert("Welcome again " + user +  "!😎  Yo!\nStart your 🐍 game😀?");
        main();
      }
      
      else {
         user = prompt("Please enter your name🙂:","");
         if (user != "" && user != null) {
           setCookie("username", user, 30);
          alert("Hola "+user+"!😎  Yo!\nStart your 🐍 game😀?");
          main();
         }
         else{
           alert("Hola amigo!😎  Yo!\nStart your 🐍 game😀?");
           main();
         }
      }
    }

    //var person = prompt("Please enter your name", "Harry Potter");


     //Start game
    
     
     var slider = document.getElementById("myRange");
     var output = document.getElementById("demo");
     output.innerHTML = slider.value;
     
     slider.oninput = function() {
       
       
       output.innerHTML = this.value;
       GAME_SPEED=400-(4*slider.value);
     }

     var slider1 = document.getElementById("myRange1");
     var output1 = document.getElementById("demo1");
     output1.innerHTML = slider1.value;
     
     slider1.oninput = function() {
       output1.innerHTML = this.value;
      if(slider1.value==1)
      box=2;
      if(slider1.value==2)
      box=4;
      if(slider1.value==3)
      box=8;
      if(slider1.value==4)
      box=10;
      if(slider1.value==5)
      box=20;
     }


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
      
      if ((dir=='up') && !goingDown0) {
        up.play();
        dx = 0;
        dy = -box;
      }

      if ((dir=='left') && !goingRight0) {
        left.play();
        dx = -box;
        dy = 0;
      }
      if ((dir=='right') && !goingLeft0) {
        right.play();
        dx = box;
        dy = 0;
      }
      if ((dir=='down') && !goingUp0) {
        down.play();
        dx = 0;
        dy = box;
      }
     


  })
}, false)




function main2(){

  const goingUp1 = dy === -box;
  const goingDown1 = dy === box;
  const goingRight1 = dx === box;
  const goingLeft1 = dx === -box;


  if(snake[0].y===foodY)
   {   
       if ( (snake[0].x > foodX)&& !goingRight1)
       {
        dx = -box;
        dy = 0;
       }

       else if( (snake[0].x < foodX)&& !goingLeft1) {
        
        dx = box;
        dy = 0;
       }
    }

    else if(snake[0].x===foodX)
    { 
      if ((snake[0].y > foodY)&& !goingDown1) {
        
        dx = 0;
        dy = -box;
      }
      
      else if((snake[0].y < foodY)&& !goingUp1) {
        
        dx = 0;
        dy = box;
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
            dx = box;
            dy = 0;
            }
          }
         /* if((snake[i].y-box === snake[0].y)&& goingUp1)
          {
            dx = -box;
            dy = 0;
          }*/
          if((snake[i].y+box === snake[0].y)&& goingUp1&&(snake[i].x === snake[0].x))
          {
            {
            dx = box;
            dy = 0;
            }
          }
         /* if((snake[i].y+box === snake[0].y)&& goingDown1)
          {
            dx = box;
            dy = 0;
          }*/
          if((snake[i].x-box === snake[0].x)&& goingRight1&&(snake[i].y === snake[0].y)){      
            {
            dx = 0;
            dy = box;
            }
          }
         /* if((snake[i].x+box === snake[0].x)&& goingleft1){      
            dx = 0;
            dy = box;
          }*/
          if((snake[i].x+box === snake[0].x)&& goingLeft1&&(snake[i].y === snake[0].y)){
            {
            dx = 0;
            dy = box;
            }
          }
         /* if((snake[i].x-box === snake[0].x)&& goingRight1){
            dx = 0;
            dy = -box;
          }*/
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
      
     

      if (((keyPressed === LEFT_KEY)||(keyPressed === 65)/*||(dir=='left')*/) && !goingRight) {
        left.play();
        dx = -box;
        dy = 0;

      }
      if (((keyPressed === UP_KEY)||(keyPressed === 87)/*||(dir=='up')*/) && !goingDown) {
        up.play();
        dx = 0;
        dy = -box;
      }
      if (((keyPressed === RIGHT_KEY)||(keyPressed === 68)/*||(dir=='right')*/) && !goingLeft) {
        right.play();
        dx = box;
        dy = 0;
      }
      if (((keyPressed === DOWN_KEY)||(keyPressed === 83)/*||(dir=='down')*/) && !goingUp) {
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

    function main() {
      
      bg1.play();

      
      
     /*if( abouttoEndGamex()){
       alert1.play();
     }*/
      // If the game ended return early to stop game
      if (didGameEnd()){ 
        alert1.play();
        if(main1()){
          return;
        }

        
        }
        

      setTimeout(function onTick() {
        
        changingDirection = false ;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main2();
        
        // Call game again
        main();
      }, GAME_SPEED)
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

    /**
     * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
     * draw a border around it
     */
    function clearCanvas() {
      //  Select the colour to fill the drawing
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      //  Select the colour for the border of the canvas
      ctx.strokestyle = CANVAS_BORDER_COLOUR;

      // Draw a "filled" rectangle to cover the entire canvas
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      // Draw a "border" around the entire canvas
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
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
        score += 1;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        
        // Generate new food location
        createFood();
      } else if(!didEatFood){
        // Remove the last part of snake body
        snake.pop();
      }
      if(hitRightWall){snake[0].x =box;}
      if(hitLeftWall){snake[0].x = 480-box;}
      if(hitToptWall){snake[0].y = 400-box;}
      if(hitBottomWall){snake[0].y = box;}

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
     
    function didGameEnd() {
      for (let i = 4; i < snake.length; i++)
      {
        if ((snake[i].x === snake[0].x) && (snake[i].y === snake[0].y))
        { 
          alert2.play();
          return true;
        }
      }

      //const hitLeftWall = snake[0].x <=-2;
     // const hitRightWall = snake[0].x >= gameCanvas.width ;
      //const hitToptWall = snake[0].y <=-2;
     // const hitBottomWall = snake[0].y >= gameCanvas.height ;

      //return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
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

    /**
     * Creates random set of coordinates for the snake food.
     */
    function createFood() {
      // Generate a random number the food x-coordinate
      foodX = randomTen(40, gameCanvas.width - 40);
      // Generate a random number for the food y-coordinate
      foodY = randomTen(40, gameCanvas.height - 40);

      // if the new food location is where the snake currently is, generate a new food location
      snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();
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

    


