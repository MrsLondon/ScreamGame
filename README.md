# scream2

# Scream

_Click here to see the deployed game_
_(Here we put the first screen of the game with the instructions and the button to start the game)_

# Description

_The main objective of the game is to kill the killers and stay alive for as long as possible to increase your score, the score also increases when the victim kills the killers._

# MPV

_- Create the start screen with the start game button._
_- Create canvas for game screen._
_- Implement basic controls to allow the victim to move left and right and throw knifes at the killer._
_- Generate randomly the killers, they come randomly from left and right direction._
_- Provide visual feedback to players with the life bar , killer health and score board._
_- Increase life bar, score board and killer health._
_- Game over when the victim life bar is zero._
_- Create the game over screen with the restart game button._

# Backlog

_- Add difficulty levels that increase the speed and number of killers._
_- Add background music and sound effects for different ocasions._
_- Generate a shield for the victim falling from the top of the screen, where when picked up the life bar increases._
_- Highest score with local storage._

# Data Structure

_- player.js: dray the player, move right and left, receive attack from the killer, update health bar, update power bar. increase power bar after specific time, draw the knife, move the knife to the killer._
_- killer.js: draw the killer, move the killer, generate killers randomly from left right direction, receive stab wound from victim and update life bar, attacks the victim._
_- shield.js: draw the shield._
_- index.js: build DOM, display splash screen, addEventLisitener to start game, draw canvas, draw game platform., display game over screen, background image, design game platform, update game, collision between the victim and killer, collision between killer and knife, update score, game reset, add musics, collision between shield and victim, update the victim's life bar by picking up the shield, update highest score with local storage._

# States y States Transitions

_Start Screen_
_Game Screen_
_Game Over Screm_

# Task

_1. Create Basic HTML/CSS Structure: Static game interface._
_2. Implement Character Movement: Controls to move the player._
_3. Item Dropping and Collection System: Logic for the shield dropping and being picked up._
_4. Enemy Confrontation Logic: Implement basic killer interactions with the player._
_5. State and Health Management: Implement health bar and updates when there is a collision between the victim and killer_
_6. Implement State Transitions: Create logic to change between states such as Menu (start scream), Game (game scream), Game Over (scream)._
_7. Final Adjustments and Testing: Refactor the code, fix bugs and optimize the game experience._
