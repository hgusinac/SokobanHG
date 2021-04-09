//------ global varibles ---------------------------------------
const gameBoard = document.getElementById("board");
let playerPos = {y:-1 ,x:-1};


//------- functions and metods----------------------------------
function isGameWon()
{
  return document.getElementsByClassName("c").length == 0;
}
function initBoard() {
  var blackBoxBool = true;
  //var boxWidth = tileMap01.width;
  //var boxHeight = tileMap01.height;
  var boxCode = "";

  

  //För varje rad...
  for (let y = 0; y < tileMap01.height; ++y) {
    
    
    // för varje box på en viss rad.
    for (let x = 0; x < tileMap01.width; ++x) {
      

      
      makeSokobanBox(tileMap01.mapGrid[y][x][0],y,x);
    }
  }
}

function makeSokobanBox(type,y,x) {
  var newBox = document.createElement("div");
  newBox.classList.add("box");
  //console.log(type);

  newBox.id= "y"+ y + "x" + x;

  //assign props depending on box type
  switch (type) {
    case "W":
      newBox.classList.add("w");
      break;
    case "B":
      newBox.classList.add("c");
      break;
    case "P":
      playerPos.x = x;
      playerPos.y = y;
      newBox.classList.add("p");
      break;
    case "G":
      newBox.classList.add("g");
      break;
    default:
  }

  gameBoard.appendChild(newBox);
}

document.addEventListener('keydown',readplayerkey)

// logiken sätts in här hur spelaren ska röra sig 
function move(offsetPosWidth, offsetPosHeight) 
{
  var playerId = "y" + playerPos.y + "x" + playerPos.x;
  var playerElement = document.getElementById("y" +  playerPos.y  +"x"+ playerPos.x);//id positionen av player
  var playerNextElement = document.getElementById("y"+(playerPos.y+offsetPosHeight)+ "x"+ (playerPos.x + offsetPosWidth));// paranteser på grund av att det fanns både text och siffror.
  var playerNextNextElement= document.getElementById("y"+(playerPos.y+offsetPosHeight *2)+ "x"+ (playerPos.x + offsetPosWidth *2))
 
  // Om spelarens nästa position inte är en vägg
  if (!playerNextElement.classList.contains("w")) {

    // Om spelarens nästa position har en låda
    if (playerNextElement.classList.contains("c") || playerNextElement.classList.contains("cg")) {

      // Om inte lådans nästa position är en vägg eller låda
      if (!(playerNextNextElement.classList.contains("w") || playerNextNextElement.classList.contains("c") || playerNextNextElement.classList.contains("cg"))) {

        playerNextElement.classList.remove("c");
        playerNextElement.classList.remove("cg");
        // Om lådans nästa position är ett mål
        if( playerNextNextElement.classList.contains("g")){
          playerNextNextElement.classList.add("cg");
        }
        // Om lådans nästa position inte är ett mål
        else
        {
          playerNextNextElement.classList.add("c")
        }

      // Flytta spelaren
        playerPos.y = playerPos.y + offsetPosHeight
        playerPos.x = playerPos.x + offsetPosWidth
        playerElement.classList.toggle("p");
        playerNextElement.classList.toggle("p");
        if(isGameWon()) alert("You Win!");
      }

    }
    // Om spelarens nästa position inte har en låda
    else {
      // Flytta spelaren
      playerPos.y = playerPos.y + offsetPosHeight
      playerPos.x = playerPos.x + offsetPosWidth
      playerElement.classList.toggle("p");
      playerNextElement.classList.toggle("p");
    }
  }
 
}


function readplayerkey(e,offsetPosWidth, offsetPosHeight){
 
  switch(e.keyCode){
    case 37: //Left
    //move(w,h)
      move(-1,0);
    break ;
    case 38://Upp
    move(0,-1);
    break ;
    case 39://Right
    
    move(+1,0);
    
    break;
    case 40://down
    move(0,+1);
    break;
  }
}

//------ run code lines ---------------------------------------------
document.getElementsByTagName("body")[0].style.backgroundColor = "darkgray";

initBoard();

