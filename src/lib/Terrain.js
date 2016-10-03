class Terrain {

  constructor(game) {
    this.game = game;
    this.p = new Processing();
  }

  draw({tileSize, scale, noiseSeed, noiseDetail_1, noiseDetail_2, centerFalloff}) {
    const screenCenterY = this.game.camera.height / 2;

    this.p.noiseSeed(noiseSeed);
    this.p.noiseDetail(noiseDetail_1, noiseDetail_2);

    // for debug line
    const graphics = this.game.add.graphics(100, 100);
    graphics.moveTo(0, 0);
    graphics.lineStyle(1, 0x0000FF, 0.8);

    // GENERATE MAP DATA
    // go through the entire viewport, increment by tilesize
    let mapData = '';
    for (let screenY = 0; screenY < this.game.camera.height; screenY += tileSize) {
      for (let screenX = 0; screenX < this.game.camera.width; screenX += tileSize) {

        // get noise value for this X and Y coordinate
        let noise = this.p.noise(screenX * scale, screenY * scale, 1);

        // above center should be more likely to be transparent
        // and below more likely to be a tile
        noise *= ((screenCenterY-screenY)/screenCenterY*centerFalloff)+1;

        if (noise < 1) {
          mapData += '0'; // show the "first" tile (we'll only have one tile...)
        } else {
          mapData += '.'; // transparent tile
        }

        // add comma except after last item
        if (screenX < this.game.camera.width - tileSize) {
          mapData += ',';
        }

        // print debug line
        // graphics.lineTo(screenX, noise)
      }

      // add new line except after last line
      if (screenY < this.game.camera.height - tileSize) {
        mapData += '\n';
      }

    }

    // console.log(mapData);
    console.log('asdsa');

    // ref: http://phaser.io/examples/v2/category/tilemaps

    // Add data to the cache
    this.game.cache.addTilemap('bgTiles', null, mapData, Phaser.Tilemap.CSV);
    const map = this.game.add.tilemap('bgTiles', tileSize, tileSize);
    // const tileWidth = Math.floor(this.game.camera.width / tileSize);
    // const tileHeight = Math.floor(this.game.camera.width / tileSize);

    //  'tiles' = cache image key,
    this.game.create.texture('tile', ['5'], tileSize, tileSize);
    map.addTilesetImage('tile', 'tile', tileSize, tileSize);
    const bgLayer = map.createLayer(0);
    // bgLayer.resizeWorld();
  }
}

export default Terrain;
