class Player {
  constructor(xPosition, yPosition) {
    const playerCharacterImage = new Image();
    playerCharacterImage.src = "assets/images/player.png";
    this.image = playerCharacterImage;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = 300;
    this.height = 300;
    this.health = 100;
    this.strength = 50;
    this.power = 100;
    this.direction = "left";
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

  moveRight(canvasWidth) {
    if (this.xPosition + this.width < canvasWidth) {
      this.direction = "right";
      this.image.src = "assets/images/playerRight.png";
      this.xPosition += 6;
    }
  }

  moveLeft() {
    if (this.xPosition > 0) {
      this.direction = "left";
      this.image.src = "assets/images/playerLeft.png";
      this.xPosition -= 6;
    }
  }

  receiveAttack(strength) {
    return (this.health -= strength);
  }

  updateHealthBar() {
    const healthBarImage = new Image();
    healthBarImage.src = "assets/images/healthbar-0.png";
    const healthBarWidth = (this.health / 100) * 168;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(52, 35, healthBarWidth, 35);
    ctx.drawImage(healthBarImage, 25, 25, 200, 54);
  }

  updatePowerBar() {
    const powerBarImage = new Image();
    powerBarImage.src = "assets/images/powerbar-0.png";
    const powerBarWidth = (this.power / 100) * 168;
    ctx.fillStyle = "#64a5d9";
    ctx.fillRect(52, 90, powerBarWidth, 35);
    ctx.drawImage(powerBarImage, 25, 80, 200, 54);
  }

  reset(canvasWidth, platformYPosition) {
    this.xPosition = canvasWidth / 2 - this.width / 2;
    this.yPosition = platformYPosition - this.height + 17;
    this.health = 100;
    this.power = 100;
  }

  setPowerInterval() {
    this.powerIntervalId = setInterval(() => {
      if (this.power < 100) {
        this.power++;
      }
    }, 200);
  }

  clearPowerInterval() {
    clearInterval(this.powerIntervalId);
  }
}

class powerKnife {
  constructor(xPosition, yPosition, direction, strength) {
    const powerKnifeImage = new Image();
    this.image = powerKnifeImage;
    this.imagesSrc = [
      "assets/images/messer.png",
      "assets/images/messer.png",
      "assets/images/messer.png",
      "assets/images/messer.png",
    ];
    this.imageIndex = 0;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = 50;
    this.height = 50;
    this.direction = direction;
    this.strength = strength;
  }

  draw() {
    this.image.src = this.imagesSrc[this.imageIndex];
    this.imageIndex++;
    // if image index is out of bound then set image index to 0.
    if (this.imageIndex === this.imagesSrc.length) {
      this.imageIndex = 0;
    }
    ctx.drawImage(
      this.image,
      this.xPosition,
      this.yPosition,
      this.width,
      this.height
    );
  }

  move() {
    if (this.direction === "right") {
      this.xPosition += 5;
    } else {
      this.xPosition -= 5;
    }
  }
}
