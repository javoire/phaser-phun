import ExampleObject from 'objects/ExampleObject';

class ProceduralTest extends Phaser.State {

	create() {
		console.log('ProceduralTest state');

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';

		//Example of including an object
		//let exampleObject = new ExampleObject(this.game);

		let mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
		mkey.onDown.add(this.switchState, this);
	}

	update() {

	}

	switchState() {
		this.game.state.start('Main');
	}
}

export default ProceduralTest;
