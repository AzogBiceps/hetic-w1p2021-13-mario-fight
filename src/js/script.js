let data = {
  player1: '',
  player2: '',
  map: '',
  gameInterval: null
}


window.appState = data;
var lifebar;


oxo.inputs.listenKey('enter', function() {

  console.log(oxo.screens.getCurrentScreen());
  if (oxo.screewns.getCurrentScreen() == 'home') {

    oxo.screens.loadScreen('characters', character);
  }
});

function map(){
  var elements = document.querySelectorAll('div.element__maps');
  var count = 0;
  console.log(elements);

  elements.forEach(element => {
    element.addEventListener('click', function(){
      if (count == 0){
        element.classList.add('selected');
        count = 1;
      } else {
        elements.forEach(elm => elm.classList.remove("selected"))
        element.classList.add("selected")

      }
      map = element.className.split(' ')[1]

    });
  })

  document.getElementById("go").addEventListener("click", function(){
    data.map = map
    console.log(data)

    oxo.screens.loadScreen('game', game);
  })
}

oxo.inputs.listenKey('enter', function() {

  console.log(oxo.screens.getCurrentScreen())
  if (oxo.screens.getCurrentScreen() == 'home') {

    oxo.screens.loadScreen('characters', character);
  }
});

function character() {
  var elements = document.querySelectorAll('div.element');
  var count = 0;
  let players = [];

  elements.forEach(element => {
    element.addEventListener('click', function() {
      console.log(count);
      if (count == 0){
        console.log('add')
        players.push(element.className.split(' ')[1])
        element.classList.add("selected");
        count++;
      } else if (count == 1 && !element.className.includes("selected")) {

        console.log('add other')
        players.push(element.className.split(' ')[1])
        element.classList.add(document.querySelector('.selectedPlayerTwo') ? 'selected' : 'selectedPlayerTwo');
        count++;
      } else if (element.className.includes("selected")) {
        count--;
        players = players.filter(function(player) { return player != element.className.split(' ')[1]; });
        element.classList.remove('selected');
        element.classList.remove('selectedPlayerTwo');
      }
    })
  });

document.getElementById("back").addEventListener("click", function(){

  data.players = []
  count = 0
  elements.forEach(element => {
    element.classList.remove("selected");
    element.classList.remove("selectedPlayerTwo");
  })
});

  document.getElementById("go").addEventListener("click", function(){
    console.log("Go");
    data.player1 = players[0];
    data.player2 = players[1];

    if (data.player1 && data.player2) {
      oxo.screens.loadScreen('maps', map);
    }

  });
}

function end(){
  console.log(data.winner);
  var winnerName = document.getElementById("winner__name");
  winnerName.innerHTML = data.winner;

}





/** GAME */

function game(){
  lifebar = document.getElementById('lifebar');

  lifebar.style.width = 5 * 10 + '%';
  console.log('GAME');

  let players = initFighters(data);
  let turn = true;
  let player1 = players[0];
  let player2 = players[1];
  console.log(player1, player2);
  // reation of data.players array with basics stats
   // select characters on the left
   if (data.player1 == 'bastien') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-bastien'); 
  }
  else if (data.player1 == 'rayan'){
    var characterLeft = document.getElementById("character__left")
    characterLeft.classList.add('is-rayan');
  }
  else if (data.player1 == 'maeva'){
    var characterLeft = document.getElementById("character__left")
    characterLeft.classList.add('is-maeva');
  }
  else if (data.player1 == 'baptiste'){
    var characterLeft = document.getElementById("character__left")
    characterLeft.classList.add('is-baptiste');
  }
  else if (data.player1 == 'mathias'){
    var characterLeft = document.getElementById("character__left")
    characterLeft.classList.add('is-mathias');
  }
  else if (data.player1 == 'justine'){
    var characterLeft = document.getElementById("character__left")
    characterLeft.classList.add('is-justine');
  }
  else if (data.player1 == 'brontis'){
    var characterLeft = document.getElementById("character__left")
    characterLeft.classList.add('is-brontis');
  }
  else if (data.player1 == 'aymeric'){
    var characterLeft = document.getElementById("character__left")
    characterLeft.classList.add('is-aymeric');
  }

  if (data.player2 == 'bastien') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-bastien'); 
  }
  else if (data.player2 == 'rayan'){
    var characterLeft = document.getElementById("character__right")
    characterLeft.classList.add('is-rayan');
  }
  else if (data.player2 == 'maeva'){
    var characterLeft = document.getElementById("character__right")
    characterLeft.classList.add('is-maeva');
  }
  else if (data.player2 == 'baptiste'){
    var characterLeft = document.getElementById("character__right")
    characterLeft.classList.add('is-baptiste');
  }
  else if (data.player2 == 'mathias'){
    var characterLeft = document.getElementById("character__right")
    characterLeft.classList.add('is-mathias');
  }
  else if (data.player2 == 'justine'){
    var characterLeft = document.getElementById("character__right")
    characterLeft.classList.add('is-justine');
  }
  else if (data.player2 == 'brontis'){
    var characterLeft = document.getElementById("character__right")
    characterLeft.classList.add('is-brontis');
  }
  else if (data.player2 == 'aymeric'){
    var characterLeft = document.getElementById("character__right")
    characterLeft.classList.add('is-aymeric');
  }

  if (data.map == 'arena'){
    var bg = document.getElementById("background")
    bg.classList.add('is-arena')
  }
  else if (data.map == 'gladiator'){
    var bg = document.getElementById("background")
    bg.classList.add('is-gladiator')
  }
  else if (data.map == 'ring'){
    var bg = document.getElementById("background")
    bg.classList.add('is-ring')
  }

  data.gameInterval = setInterval(() => {
    document.getElementById("gosef").style.display = "none"

    // Detecting death
    if(getLife(player1) > 0 && getLife(player2) === 0){
      //here you need to load the final page with J1 by winning
      console.log('J1 a gagné');
      clearInterval(data.gameInterval)
      data.gameInterval = null
      var winner = data.winner = player1.name;
      // document.getElementById("gosef").style.display = "block"
      oxo.screens.loadScreen('end', end);
    } else if(getLife(player2) > 0 && getLife(player1) === 0) { 
      //here you need to load the final page with J2 by winning
      console.log('J2 a gagné');
      clearInterval(data.gameInterval)
      data.gameInterval = null
      var winner = data.winner = player2.name;
      // document.getElementById("gosef").style.display = "block"
      oxo.screens.loadScreen('end', end);
    }

    // Attack listeners
    oxo.inputs.listenKey('q', function() {
      if(turn){ // J1 is playing
        console.log("Q pressed")
        action(player1, player2, 'atk')
        turn = !turn
      }
    })

    oxo.inputs.listenKey('k', function() {
      if(!turn){ // J2 is playing
        console.log("K pressed")
        action(player2, player1, 'atk')
        turn = !turn
      }
    })
    // Heal listeners
    oxo.inputs.listenKey('s', function() {
      if(turn){ // J1 is playing
        console.log("S pressed")
        action(player1, player2, 'heal')
        turn = !turn
      }
    })

    oxo.inputs.listenKey('l', function() {
      if(!turn){ // J2 is playing
        console.log("L pressed")
        action(player2, player1, 'heal')
        turn = !turn
      }
    })
    // Shield listeners
    oxo.inputs.listenKey('d', function() {
      if(turn){ // J1 is playing
        console.log("D pressed")
        action(player1, player2, 'def')
        turn = !turn
      }
    })

    oxo.inputs.listenKey('m', function() {
      if(!turn){ // J2 is playing
        console.log("M pressed")
        action(player2, player1, 'def')
        turn = !turn
      }
    })

  }, 200)

  // document.getElementById("gosef").addEventListener("click", function(){
  //   console.log("End page");
  //   oxo.screens.loadScreen('end', end);
  // });

}

/**
* action realized by a character
@param {playerAtk} object - Player who plays
@param {playerDef} object - Player enemy
@param {type} string - Action of the player
*/
function action(playerAtk,playerDef,type){
  //Action according to the type
  switch(type) {
    case 'heal':
      heal(playerAtk);
      break;
    case 'def':
      def(playerAtk);
      break;
    default:
      attack(playerAtk,playerDef);
  }
}

/**
A player attacks the other one
@param {playerAtk} object - Player who plays
@param {playerDef} object - Player enemy
*/
function attack(playerAtk,playerDef){
  //J2 is in defense
  if(playerDef.def != 0){
    semiAttack(playerDef);
    playerDef.def = 0;
  } else {
    //J2 is normal
    fullAttack(playerDef);
  }
  return false;
}



//Has to modify for the value
function heal(player){
  player.LP +=1;
}

//the player switches to defense mode and wins 0.5 of next def round (=50% damage reduction)
//Has to modify for the value
function def(player){
  player.def +=0.5;
}

//refers to the life of the player
function getLife(player){
  return player.LP;
}

//performs a complete attack with 8/10 succes
function fullAttack(player){
  //creation of a random number between 1 and 10
  succes = Math.floor((Math.random() * 10) + 1);
  if(succes > 2){ 
    //if the number is greater than 2 succes
    player.LP -= 1;
  } else { 
    //else fail
  }
}

//makes an attack on a player in defense mode
function semiAttack(player){
  //the blow is always successful in defense mode
  player.LP -= 0.5;
}

 /**
 *Initializes the initial state of the two combatants
 * @param {data} tableau - contains both data.players and map
 * @return {data.players} -Table composed of the two data.players with combat characteristics
 */
function initFighters(data){
  //create a tab with J1 and J2 with features
  let players = [];
  players.push({'name':data.player1,'LP':10,'def':0},{'name':data.player2,'LP':10,'def':0});
  return players;
}
