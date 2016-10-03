import Dat from 'dat.gui';
import Terrain from '../lib/Terrain';

class ProceduralTest extends Phaser.State {

  create() {
    console.log('ProceduralTest state');
    this.game.stage.backgroundColor = '#eeeeff';

    // switch state
    const mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
    mkey.onDown.add(this.switchState, this);

    const terrain = new Terrain(this.game);

    const pixelWidth = 16;
    const terrainSettings = {
      tileSize: pixelWidth,
      scale: 0.0001,
      noiseSeed: 1,
      noiseDetail_1: 8,
      noiseDetail_2: 0.7,
      centerFalloff: 0.8
    };

    const gui = new Dat.GUI();
    const controllers = [
      gui.add(terrainSettings, 'tileSize'), //.min(4).max(64).step(1),
      gui.add(terrainSettings, 'scale'), //.min(0.00001).max(0.001).step(0.00001),
      gui.add(terrainSettings, 'noiseSeed'), //.min(0).max(10).step(1),
      gui.add(terrainSettings, 'noiseDetail_1'), //.min(0).max(32).step(1),
      gui.add(terrainSettings, 'noiseDetail_2'), //.min(0).max(3).step(1),
      gui.add(terrainSettings, 'centerFalloff'), //.min(0).max(3).step(0.1),
    ];

    controllers.map((c) => c.onFinishChange(() => terrain.draw(terrainSettings)));
    terrain.draw(terrainSettings);
  }

  update() {

  }

  switchState() {
    this.game.state.start('Main');
  }
}

export default ProceduralTest;
