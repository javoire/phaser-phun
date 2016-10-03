import Dat from 'dat.gui';

class ProceduralTest extends Phaser.State {

  create() {
    const _this = this;

    console.log('ProceduralTest state');
    this.game.stage.backgroundColor = '#eeeeff';

    // switch state
    const mkey = this.game.input.keyboard.addKey(Phaser.KeyCode.M);
    mkey.onDown.add(this.switchState, this);

    const graphics = this.game.add.graphics(100, 100);
    const p = new Processing();
    const screenCenterY = this.game.camera.height / 2;

    const Terrain = function() {
      const pixelWidth = 16;
      this.pixelHeight = pixelWidth;
      this.tileSize = pixelWidth;
      this.scale = 0.0001;
      this.noiseSeed = 1;
      this.noiseDetail_1 = 8;
      this.noiseDetail_2 = 0.7;

      p.noiseSeed(this.noiseSeed);
      p.noiseDetail(this.noiseDetail_1, this.noiseDetail_2);

      // for debug line
      graphics.moveTo(0, 0);
      graphics.lineStyle(1, 0x0000FF, 0.8);

      // GENERATE MAP DATA
      // go throught the entire viewport, increment by tilesize
      let mapData = '';
      for (let screenY = 0; screenY < _this.game.camera.height; screenY += this.tileSize) {
        for (let screenX = 0; screenX < _this.game.camera.width; screenX += this.tileSize) {

          // get noise value for this X and Y coordinate
          let noise = p.noise(screenX * this.scale, screenY * this.scale, 1);

          // above center should be more likely to be transparent
          // and below more likely to be a tile
          noise *= ((screenCenterY-screenY)/screenCenterY*0.8)+1;

          if (noise < 1) {
            mapData += '0'; // show the "first" tile (we'll only have one tile...)
          } else {
            mapData += '.'; // transparent tile
          }

          // add comma except after last item
          if (screenX < _this.game.camera.width - this.tileSize) {
            mapData += ',';
          }

          // print debug line
          // graphics.lineTo(screenX, noise)
        }

        // add new line except after last line
        if (screenY < _this.game.camera.height - this.tileSize) {
          mapData += '\n';
        }

      }

      console.log(mapData);

      // ref: http://phaser.io/examples/v2/category/tilemaps

      // Add data to the cache
      _this.game.cache.addTilemap('bgTiles', null, mapData, Phaser.Tilemap.CSV);
      const map = _this.game.add.tilemap('bgTiles', this.tileSize, this.tileSize);
      // const tileWidth = Math.floor(_this.game.camera.width / this.tileSize);
      // const tileHeight = Math.floor(_this.game.camera.width / this.tileSize);

      //  'tiles' = cache image key,
      _this.game.create.texture('tile', ['5'], this.tileSize, this.tileSize);
      map.addTilesetImage('tile', 'tile', this.tileSize, this.tileSize);
      const bgLayer = map.createLayer(0);

      // bgLayer.resizeWorld();
    };

    const terrain = new Terrain();
    const gui = new Dat.GUI();
    gui.add(terrain, 'tileSize');
    gui.add(terrain, 'scale');
    gui.add(terrain, 'noiseSeed');
    gui.add(terrain, 'noiseDetail_1');
    gui.add(terrain, 'noiseDetail_2');

  }

  update() {

  }

  switchState() {
    this.game.state.start('Main');
  }
}

export default ProceduralTest;
