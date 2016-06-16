import Sprites from 'objects/Sprites';
import move from 'modules/move';

var duck;
var game;
var platforms;
var cursors;
var sprites;
var ground;

class Main extends Phaser.State {

	create() {
		game = this.game;
		sprites = new Sprites(game);
		console.log('Main state');

		//Enable Arcade Physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Set the games background colour
		game.stage.backgroundColor = '#fff';

		platforms = game.add.group();
		platforms.enableBody = true;
		ground = platforms.create(0, game.world.height - 80);
		ground.body.immovable = true;

		duck = sprites.duck();
		game.physics.arcade.enable(duck);

		duck.body.bounce.y = 0.2;
		duck.body.gravity.y = 300;
		duck.body.collideWorldBounds = true;

		cursors = game.input.keyboard.createCursorKeys();

		// can't figure out where to put this to make it "global"
		// i.e not only listenable when this state is active
		let mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
		mkey.onDown.add(this.switchState, this);

	}

	update() {
		game.physics.arcade.collide(duck, platforms);
		move(duck, cursors);
	}

	switchState() {
		this.game.state.start('ProceduralTest');
	}
}

export default Main;
