import ExampleObject from 'objects/ExampleObject';

class ProceduralTest extends Phaser.State {

  create() {
    console.log('ProceduralTest state');

    //Enable Arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Set the games background colour
    this.game.stage.backgroundColor = '#000';

    //Example of including an object
    //let exampleObject = new ExampleObject(this.game);

    // switch state
    let mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
    mkey.onDown.add(this.switchState, this);

    // graphics test
    var graphics = this.game.add.graphics(100, 100);
    graphics.beginFill(Phaser.Color.getColor(123,3,5));
    graphics.drawRect(50, 250, 100, 100);
    graphics.endFill();

    graphics.moveTo(0, 0);
    graphics.lineStyle(10, 0xFF0000, 0.8);
    for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
      let x = angle * 100;
      let y = Math.sin(angle) * 100;
      graphics.lineTo(x, y)
      console.log(angle)
    }

  }

  update() {

  }

  switchState() {
    this.game.state.start('Main');
  }
}

export default ProceduralTest;
