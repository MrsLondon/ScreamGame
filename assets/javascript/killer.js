class KillerType {
  constructor(
    name,
    leftImageSrc,
    rightImageSrc,
    width,
    height,
    health,
    strength
  ) {
    this.name = name;
    this.leftImageSrc = leftImageSrc;
    this.rightImageSrc = rightImageSrc;
    this.width = width;
    this.height = height;
    this.health = health;
    this.strength = strength;
  }
}

// instantiate type of killers one with jill and other amber.
const Jill = new KillerType(
  "jill",
  "assets/images/scream-left.png",
  "assets/images/scream-right.png",
  600,
  400,
  100,
  20
);
const Amber = new KillerType(
  "amber",
  "assets/images/scream-left.png",
  "assets/images/scream-right.png",
  600,
  400,
  100,
  20
);

// store killer types into array so can be generate randomly.
const killerTypes = [Jill, Amber];

// store killer direction into array so can be generate randomly.
const killerDirection = ["right", "left"];

class Killer {
  constructor(canvasWidth, platformYPosition) {
    let randomkillerTypeIndex = Math.floor(Math.random() * killerTypes.length);
    let killerDirectionIndex = Math.floor(
      Math.random() * killerDirection.length
    );
    let killerXPosition;
    let killerImage = new Image();

    if (killerDirection[killerDirectionIndex] === "right") {
      killerImage.src = killerTypes[randomkillerTypeIndex].rightImageSrc;
      killerXPosition = -400;
    } else {
      killerImage.src = killerTypes[randomkillerTypeIndex].leftImageSrc;
      killerXPosition = canvasWidth + 400;
    }

    this.image = killerImage;
    this.xPosition = killerXPosition;
    this.yPosition =
      platformYPosition - killerTypes[randomkillerTypeIndex].height;
    this.width = killerTypes[randomkillerTypeIndex].width;
    this.height = killerTypes[randomkillerTypeIndex].height;
    this.type = killerTypes[randomkillerTypeIndex];
    this.direction = killerDirection[killerDirectionIndex];
    this.health = killerTypes[randomkillerTypeIndex].health;
    this.strength = killerTypes[randomkillerTypeIndex].strength;
    this.readyToAttack = true;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );
  }

  drawHealthBar() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.xPosition + 10, this.yPosition - 15, this.health, 8);
  }

  move() {
    this.moveIntervalId = setInterval(() => {
      if (this.direction === "right") {
        this.xPosition += 0.5;
      } else {
        this.xPosition -= 0.5;
      }
    }, 1);
  }

  changeDirection(playerXPosition, playerWidth) {
    if (this.xPosition > playerXPosition + playerWidth) {
      this.direction = "left";
      this.image.src = this.type.leftImageSrc;
    } else if (this.xPosition < playerXPosition) {
      this.direction = "right";
      this.image.src = this.type.rightImageSrc;
    }
  }

  toggleReadyToAttack() {
    return (this.readyToAttack = !this.readyToAttack);
  }

  receiveAttack(strength) {
    return (this.health -= strength);
  }
}
