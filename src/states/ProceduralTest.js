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

    function drawTerrain({tileSize, scale, noiseSeed, noiseDetail_1, noiseDetail_2, centerFalloff}) {
      p.noiseSeed(noiseSeed);
      p.noiseDetail(noiseDetail_1, noiseDetail_2);

      // for debug line
      graphics.moveTo(0, 0);
      graphics.lineStyle(1, 0x0000FF, 0.8);

      // GENERATE MAP DATA
      // go through the entire viewport, increment by tilesize
      let mapData = '';
      for (let screenY = 0; screenY < _this.game.camera.height; screenY += tileSize) {
        for (let screenX = 0; screenX < _this.game.camera.width; screenX += tileSize) {

          // get noise value for this X and Y coordinate
          let noise = p.noise(screenX * scale, screenY * scale, 1);

          // above center should be more likely to be transparent
          // and below more likely to be a tile
          noise *= ((screenCenterY-screenY)/screenCenterY*centerFalloff)+1;

          if (noise < 1) {
            mapData += '0'; // show the "first" tile (we'll only have one tile...)
          } else {
            mapData += '.'; // transparent tile
          }

          // add comma except after last item
          if (screenX < _this.game.camera.width - tileSize) {
            mapData += ',';
          }

          // print debug line
          // graphics.lineTo(screenX, noise)
        }

        // add new line except after last line
        if (screenY < _this.game.camera.height - tileSize) {
          mapData += '\n';
        }

      }

      // console.log(mapData);
      console.log('asdsa');

      // ref: http://phaser.io/examples/v2/category/tilemaps

      // Add data to the cache
      _this.game.cache.addTilemap('bgTiles', null, mapData, Phaser.Tilemap.CSV);
      const map = _this.game.add.tilemap('bgTiles', tileSize, tileSize);
      // const tileWidth = Math.floor(_this.game.camera.width / tileSize);
      // const tileHeight = Math.floor(_this.game.camera.width / tileSize);

      //  'tiles' = cache image key,
      _this.game.create.texture('tile', ['5'], tileSize, tileSize);
      map.addTilesetImage('tile', 'tile', tileSize, tileSize);
      const bgLayer = map.createLayer(0);
      // bgLayer.resizeWorld();
    }

    const pixelWidth = 16;
    const pixelHeight = 16;
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

    controllers.map((c) => c.onFinishChange(() => drawTerrain(terrainSettings)));

    drawTerrain(terrainSettings);
  }

  update() {

  }

  switchState() {
    this.game.state.start('Main');
  }
}

export default ProceduralTest;
