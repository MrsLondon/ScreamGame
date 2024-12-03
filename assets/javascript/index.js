const startGameBtn = document.querySelectorAll(".start-game-btn");
const startGameScreen = document.getElementById("start-game-container");
const mainGameScreen = document.getElementById("main-game-container");
const gameOverScreen = document.getElementById("game-over-container");
const displayFinalScore = document.getElementById("score");
const displayHighestScore = document.getElementById("highscore");
const musicBtn = document.getElementById("music-btn");
const musicImg = document.getElementById("music-img");

const themeAudio = new Audio("assets/music/SCREAMMovieSoundtrack.mp3");
const gameAudio = new Audio("assets/music/Assassin.ogg");
const playerAttackAudio = new Audio("assets/music/knife1.mp3");
const playerEatingAudio = new Audio("assets/music/eating.mp3");
const killerGrowlAudio = new Audio("assets/music/eviljest.mp3");
const killerBiteAudio = new Audio("assets/music/eviljest.mp3");
const gameOverAudio = new Audio("assets/music/game-over.wav");
themeAudio.currentTime = 20;
themeAudio.volume = 0.2;
gameAudio.volume = 0.2;
playerAttackAudio.volume = 0.2;
playerEatingAudio.volume = 0.2;
killerGrowlAudio.volume = 0.2;
killerBiteAudio.volume = 0.2;
gameOverAudio.volume = 0.2;

const canvas = document.querySelector("canvas");
canvas.width = screen.width;
canvas.height = screen.height;
const ctx = canvas.getContext("2d");

let intervalId;
let scoreIntervalId;
let killerCreateIntervalId;
let shieldIntervalId;
let score;
let highScore = localStorage.getItem("Highscore");
let knifeArr;
let killersArray;
let isGameOver = false;
let sound = false;
let shield;

// game platform
let platformHeight = 100;
let platformXPosition = 0;
let platformYPosition = screen.height - platformHeight;
const gamePlatformImage = new Image();
gamePlatformImage.src = "assets/images/dark-night.avif";

// game background
const background = new Image();
background.src = "assets/images/dark-night.avif";

// instantiate player object
const player = new Player(
  canvas.width / 2 - this.width / 2,
  platformYPosition - this.height + 17
);

// reset game on game over screen.
function resetGame() {
  isGameOver = false;
  knifeArr = [];
  killersArray = [];
  score = 0;

  // reset player position
  player.reset(canvas.width, platformYPosition);
  shield = undefined;

  // update music
  themeAudio.pause();
  gameAudio.currentTime = 0;
  gameAudio.play();

  // increases score at every second
  scoreIntervalId = setInterval(() => {
    score++;
  }, 1000);

  // increases player's power every 2 seconds
  player.setPowerInterval();

  // Generate random killer every 3 seconds
  killerCreateIntervalId1 = createKillerInterval(3000);

  // Generate random killer every 5 seconds
  killerCreateIntervalId2 = createKillerInterval(5000);

  // Create killer every `interval` seconds, push into array, and move killers
  function createKillerInterval(interval) {
    return setInterval(() => {
      let killer = createKiller(); // Ensure function name is consistent
      killersArray.push(killer); // Add killer to the array
      killerGrowlAudio.play(); // Play killer growl sound
      killer.move(); // Start killer movement
    }, interval);
  }

  // create shield every 10 seconds
  shieldIntervalId = setInterval(() => {
    if (shield === undefined) {
      shield = createShield(); // Correct spelling
    }
  }, 20000);
}

function updateScoreDisplay() {
  ctx.fillStyle = "red";
  ctx.fillText(`Score:`, canvas.width - 200, 50);
  ctx.fillText(computeSixDigitScore(score), canvas.width - 200, 90);
  ctx.font = `30px Arcade`;
}

function computeSixDigitScore(score) {
  score = "00000" + score;
  return score.slice(score.length - 6, score.length);
}

function createKiller() {
  return new Killer(canvas.width, platformYPosition);
}

function createPowerBall() {
  if (player.power <= 0) {
    return;
  }
  player.power -= 10;
  let powerBallPositionX;
  if (player.direction === "right") {
    powerBallPositionX = player.xPosition + player.width - 25;
  } else {
    powerBallPositionX = player.xPosition - 15;
  }
  playerAttackAudio.currentTime = 0;
  playerAttackAudio.play();
  return new PowerBall(
    powerBallPositionX,
    player.yPosition,
    player.direction,
    player.strength
  );
}

function createShield() {
  return new Shield(canvas.width);
}

function playSoundOnStartScreen() {
  sound = !sound;
  if (sound) {
    musicImg.src = "assets/images/music.png";
    themeAudio.play();
  } else {
    musicImg.src = "assets/images/no-music.png";
    themeAudio.pause();
  }
}

function gameOver() {
  // update music
  gameOverAudio.play();
  themeAudio.currentTime = 10;
  themeAudio.play();
  gameAudio.pause();

  // clear intervals
  cancelAnimationFrame(intervalId);
  clearInterval(scoreIntervalId);
  player.clearPowerInterval();
  clearInterval(killerCreateIntervalId1);
  clearInterval(killerCreateIntervalId2);
  clearInterval(shieldIntervalId);

  // check highest score and display score board
  highScore = score > highScore ? score : highScore;
  localStorage.setItem("Highscore", highScore);
  displayFinalScore.innerText = computeSixDigitScore(score);
  displayHighestScore.innerHTML = computeSixDigitScore(highScore);

  // display game over screen and hide all other screens.
  canvas.style.display = "none";
  mainGameScreen.style.display = "none";
  startGameScreen.style.display = "none";
  gameOverScreen.style.display = "flex";
}

window.onload = () => {
  //display only splash screen
  startGameScreen.style.display = "flex";
  mainGameScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  canvas.style.display = "none";

  // play start screen music on button click
  musicBtn.addEventListener("click", playSoundOnStartScreen);

  // when start game btn click hide splash screen and go to main game screen
  startGameBtn.forEach((item) => {
    item.addEventListener("click", (event) => {
      resetGame();
      updateGame();
    });
  });

  // left right movement of player
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      player.moveRight(canvas.width);
    } else if (event.code === "ArrowLeft") {
      player.moveLeft();
    } else if (event.code === "Space") {
      const powerBall = createPowerBall();
      if (powerBall !== undefined) {
        knifeArr.push(powerBall);
      }
    }
  });

  function updateGame() {
    startGameScreen.style.display = "none";
    mainGameScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    canvas.style.display = "flex";

    // draw background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // draw game platform
    ctx.drawImage(
      gamePlatformImage,
      platformXPosition,
      platformYPosition,
      canvas.width,
      platformHeight
    );

    // draw player character
    player.draw();

    // update score
    updateScoreDisplay();

    // draw health bar
    player.updateHealthBar();

    // draw power bar
    player.updatePowerBar();

    // draw shield
    if (shield != undefined) {
      ctx.drawImage(
        shield.image,
        shield.xPosition,
        shield.yPosition,
        shield.width,
        shield.height
      );
      // move shield from top to bottom.
      if (shield.yPosition + shield.height < platformYPosition) {
        shield.yPosition++;
      }

      // collision of player with shield, update health of player.
      if (
        player.xPosition < shield.xPosition + shield.width - 50 &&
        player.xPosition + player.width - 50 > shield.xPosition &&
        player.yPosition < shield.yPosition + shield.height
      ) {
        if (player.health < 100) {
          player.health += shield.refill;
          if (player.health > 100) {
            player.health = 100;
          }
        }
        playerEatingAudio.play();
        shield = undefined;
      }
    }

    // draw knife
    for (let i = 0; i < knifeArr.length; i++) {
      // draw powerball
      knifeArr[i].draw();

      // move knife
      knifeArr[i].move();

      // if knife is going to out of canvas width it should remove from array.
      if (
        knifeArr[i].xPosition + knifeArr[i].width < 0 ||
        knifeArr[i].xPosition > canvas.width
      ) {
        knifeArr.splice(i, 1);
        continue;
      }

      // collision of knife with killer --> to kill killer with knife
      for (let j = 0; j < killersArray.length; j++) {
        if (
          knifeArr[i].xPosition <
            killersArray[j].xPosition + killersArray[j].width - 32 &&
          knifeArr[i].xPosition + knifeArr[i].width > killersArray[j].xPosition
        ) {
          killersArray[j].receiveAttack(knifeArr[i].strength);
          knifeArr.splice(i, 1);
          // if killer health is zero then remove killer array.
          if (killersArray[j].health <= 0) {
            killersArray.splice(j, 1);
            new Audio("assets/music/pain4.wav").play();
            score += 20;
          }
          break;
        }
      }
    }

    // draw killers
    for (let i = 0; i < killersArray.length; i++) {
      killersArray[i].draw();
      killersArray[i].drawHealthBar();
      killersArray[i].changeDirection(player.xPosition, player.width);

      // player collision with killers
      if (
        player.xPosition <
          killersArray[i].xPosition + killersArray[i].width - 32 &&
        player.xPosition + player.width - 32 > killersArray[i].xPosition
      ) {
        // to make killer stop
        if (killersArray[i].direction === "right") {
          killersArray[i].xPosition -= 2;
        } else {
          killersArray[i].xPosition += 2;
        }

        // when killer attack to player
        if (killersArray[i].readyToAttack) {
          player.receiveAttack(killersArray[i].strength);
          killersArray[i].toggleReadyToAttack();
          killerBiteAudio.play();
          setTimeout(() => {
            killersArray[i].toggleReadyToAttack();
          }, 3000);

          // game over when player's health zero on killer attack.
          if (player.health <= 0) {
            isGameOver = true;
          }
        }
      }
    }

    // update game/
    intervalId = requestAnimationFrame(updateGame);

    // if game over then invoke game over function
    if (isGameOver) {
      gameOver();
    }
  }
};
