class Shield {
  constructor(canvasWidth) {
    this.xPosition = Math.random() * (canvasWidth - 50); // Random X position within the canvas
    this.yPosition = 0; // Start at the top of the canvas
    this.width = 150; // Width of the shield
    this.height = 150; // Height of the shield
    this.image = new Image(); // Create a new image object
    this.image.src = "assets/images/shield.png"; // Ensure the shield image exists in this path
    this.refill = 20; // Amount of health to refill
  }
}
