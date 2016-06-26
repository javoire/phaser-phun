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

    let pixelWidth = 32;
    let pixelHeight = pixelWidth;

    // a tile should be 32 pixels in size (4 sprite pixels..)
    // add spacing of 1 to easier see individual tiles
    let tileSize = pixelWidth;

    let scale = 0.0001;
    p.noiseSeed(1);
    p.noiseDetail(8, 0.7);

    // for debug line
    graphics.moveTo(0, 0);
    graphics.lineStyle(1, 0x0000FF, 0.8);

    // GENERATE MAP DATA
    // go throught the entire viewport, increment by tilesize
    let mapData = '';
    for (let screenY = 0; screenY < this.game.camera.height; screenY += tileSize) {

      for (let screenX = 0; screenX < this.game.camera.width; screenX += tileSize) {

        // get Y value for this screen X coordinate
        let yNoise = p.noise(screenX * scale, 1, 1) * 700;

        // render a sprite tile if current screen Y coordinate is lower
        // than the y noise value (screen coords Y is inverted, hence the >)
        if (screenY > yNoise) {
          mapData += '0'; // pick the "first" tile (we'll only have one tile...)
        } else {
          mapData += '.'; // transparent tile
        }

        // add comma except after last item
        if (screenX < this.game.camera.width - tileSize) {
          mapData += ',';
        }

        // print debug line
        graphics.lineTo(screenX, yNoise)
      }

      // add new line except after last line
      if (screenY < this.game.camera.height - tileSize) {
        mapData += '\n';
      }

    }

    console.log(mapData)

    // ref: http://phaser.io/examples/v2/category/tilemaps

    // Add data to the cache
    this.game.cache.addTilemap('bgTiles', null, mapData, Phaser.Tilemap.CSV);
    let map = this.game.add.tilemap('bgTiles', tileSize, tileSize);
    // let tileWidth = Math.floor(this.game.camera.width / tileSize);
    // let tileHeight = Math.floor(this.game.camera.width / tileSize);

    //  'tiles' = cache image key,
    this.game.create.texture('tile', ['5'], tileSize, tileSize);
    map.addTilesetImage('tile', 'tile', tileSize, tileSize);
    let bgLayer = map.createLayer(0);

    // bgLayer.resizeWorld();

  }

  update() {

  }

  switchState() {
    this.game.state.start('Main');
  }
}

export default ProceduralTest;
