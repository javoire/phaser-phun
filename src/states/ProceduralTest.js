import Dat from 'dat.gui';
import Terrain from '../lib/Terrain';

class ProceduralTest extends Phaser.State {

  constructor() {
    super();
    this.drawTerrain = this.drawTerrain.bind(this);
    this.setupTerrain = this.setupTerrain.bind(this);
    this.updatingTerrain = false;
  }

  create() {
    console.log('ProceduralTest state');

    // switch state
    const mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
    mkey.onDown.add(this.switchState, this);

    this.game.stage.backgroundColor = '#eeeeff';
    this.setupTerrain();
  }

  update() {
    if (this.updatingTerrain) {
      this.drawTerrain()
    }
  }

  switchState() {
    this.game.state.start('Main');
  }

  drawTerrain() {
    this.terrain.settings = this.terrainSettings;
    this.terrain.redraw();
  }

  setupTerrain() {
    this.terrainSettings = {
      tileSize: 16,
      scale: 0.0001,
      noiseSeed: 1,
      noiseDetail_1: 8,
      noiseDetail_2: 0.7,
      centerFalloff: 0.8
    };

    // instaniate and render a noise terrain
    this.terrain = new Terrain(this.game, this.terrainSettings);

    // add gui controls to tweak the terrain settings in real time
    const gui = new Dat.GUI();
    gui.add(this.terrainSettings, 'tileSize'); //.min(4).max(64).step(1);
    gui.add(this.terrainSettings, 'scale'); //.min(0.00001).max(0.001).step(0.00001);
    gui.add(this.terrainSettings, 'noiseSeed'); //.min(0).max(10).step(1);
    gui.add(this.terrainSettings, 'noiseDetail_1'); //.min(0).max(32).step(1);
    gui.add(this.terrainSettings, 'noiseDetail_2'); //.min(0).max(3).step(1);
    gui.add(this.terrainSettings, 'centerFalloff'); //.min(0).max(3).step(0.1),


    // redraw terrain when editing values
    document.querySelector('.dg.main.a').addEventListener('mousedown', () => this.updatingTerrain = true);
    document.querySelector('.dg.main.a').addEventListener('mouseup', () => this.updatingTerrain = false);
    document.querySelector('.dg.main.a').addEventListener('mouseleave', () => this.updatingTerrain = false);
  }
}

export default ProceduralTest;
