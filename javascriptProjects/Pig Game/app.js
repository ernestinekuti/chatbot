/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevScore, winningScore;


init();
//dice = Math.floor(Math.random() * 6) + 1;
//var doc = document.querySelector
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';




document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){

    
    //1.Random Number
   var dice = Math.floor(Math.random() * 6) +1;
   console.log('dice score ' + dice);


// double six
        if(prevScore === 6 && dice === 6){
   

        nextPlayer();

   
   //alert(' two sixes');
          } else{
     
         //display the result
        var diceDom = document.querySelector('.dice');
         document.querySelector('.dice').style.display = 'block';
         document.querySelector('.dice').src = 'dice-' + dice + '.png';
    

    // Update the round score IF the rolled number was NOT a 1
          if(dice !== 1){
      
            
         // Add score
          prevScore = dice;
          console.log('previous score ' + prevScore);
          roundScore += dice;
           document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }else {
        // Next player
       nextPlayer();

         }
      }
    
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
//add current score to global score
if(gamePlaying){
scores[activePlayer] += roundScore;


// update the UI
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

//check if player won the game
if(scores[activePlayer] >= 20){
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
gamePlaying = false;
} else{
    nextPlayer();
}
}
// Next Player

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
   // document.querySelector('.player-0-panel').classList.toggle('active');
    // document.querySelector('.player-0-panel').classList.toggle('active');

    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';

}
function changedText(){
    
}



document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    prevScore = 0;
    gamePlaying = true;
    document.getElementById('ws').value = 0;
    winningScore = document.getElementById('ws').value;
    winningScore.changedText();
    console.log('score' + winningScore);
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0' ).textContent = 'Player 1';
    document.getElementById('name-1' ).textContent = 'Player 2';
    //document.querySelector('.dice').style.display = 'none';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');

    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    }