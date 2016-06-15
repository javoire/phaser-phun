import ExampleObject from 'objects/ExampleObject';

class Main extends Phaser.State {

	create() {
		console.log('Main state');

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';

		//Example of including an object
		//let exampleObject = new ExampleObject(this.game);

		// can't figure out where to put this to make it "global"
		// i.e not only listenable when this state is active
		let mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
		mkey.onDown.add(this.switchState, this);
	}

	update() {

	}

	switchState() {
		this.game.state.start('ProceduralTest');
	}
}

export default Main;
