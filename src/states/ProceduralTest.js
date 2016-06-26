import ExampleObject from 'objects/ExampleObject';

class ProceduralTest extends Phaser.State {

  create() {
    console.log('ProceduralTest state');

    //Enable Arcade Physics
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Set the games background colour
    this.game.stage.backgroundColor = '#eeeeff';

    //Example of including an object
    //let exampleObject = new ExampleObject(this.game);

    // switch state
    let mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
    mkey.onDown.add(this.switchState, this);

    // graphics test
    let graphics = this.game.add.graphics(100, 100);

    let p = new Processing();

    let pixelWidth = 8;
    let pixelHeight = pixelWidth;

    // a block should be 32 pixels in size (4 sprite pixels..)
    // add spacing of 1 to easier see individual blocks
    let blockSize = pixelWidth*4+1;

    graphics.moveTo(0, 0);
    graphics.lineStyle(1, 0x0000FF, 0.8);

    let scale = 0.0001;
    p.noiseSeed(1);
    p.noiseDetail(8, 0.7);

    // go throught the entire viewport, increment by blocksize
    for (let screenX = 0; screenX < this.game.camera.width; screenX += blockSize) {

      // get Y value for this screen X coordinate
      let yNoise = p.noise(screenX * scale, 1, 1) * 700;

      for (let screenY = 0; screenY < this.game.camera.height; screenY += blockSize) {

        // render a sprite block if current screen Y coordinate is lower
        // than the y noise value (screen coords Y is inverted, hence the >)
        if (screenY > yNoise) {
          let data = ['3333','3553','3553','3333'];
          let id = 'block'+screenX+screenY;
          this.game.create.texture(id, data, pixelWidth, pixelHeight);
          this.game.add.sprite(screenX, screenY, id);
        }
      }

      // debug print the line
      graphics.lineTo(screenX, yNoise)
    }
  }

  update() {

  }

  switchState() {
    this.game.state.start('Main');
  }
}

export default ProceduralTest;
