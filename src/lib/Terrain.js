class Terrain {

  constructor(game, settings) {
    this.game = game;
    this.p = new Processing();
    this._settings = settings;

    const mapData = this.generateMapData();
    this.renderTileMap(mapData);
  }

  get settings() {
    return this._settings;
  }

  set settings(newSettings) {
    if (newSettings) {
      this._settings = newSettings;
    }
  }

  redraw() {
    const mapData = this.generateMapData();

    // remove previous TilemapLayer
    // IMPORTANT! prevent memory leak
    this.tilemapLayer.destroy();

    this.renderTileMap(mapData);
  }

  renderTileMap(mapData) {
    // add tiles from mapData to cache
    this.game.cache.addTilemap('bgTiles', null, mapData, Phaser.Tilemap.CSV);

    // create a tilemap instance
    this.tilemap = this.game.add.tilemap('bgTiles', this._settings.tileSize, this._settings.tileSize);

    // create a texture for a tile
    this.game.create.texture('tile', ['5'], this._settings.tileSize, this._settings.tileSize);

    // add tile texture to tilemap
    this.tilemap.addTilesetImage('tile', 'tile', this._settings.tileSize, this._settings.tileSize);

    // create a TilemapLayer
    this.tilemapLayer = this.tilemap.createLayer(0);
  }

  generateMapData() {
    const { tileSize, scale, noiseSeed, noiseDetail_1, noiseDetail_2, centerFalloff } = this._settings;
    const screenCenterY = this.game.camera.height / 2;

    this.p.noiseSeed(noiseSeed);
    this.p.noiseDetail(noiseDetail_1, noiseDetail_2);

    let mapData = '';
    for (let screenY = 0; screenY < this.game.camera.height; screenY += tileSize) {
      for (let screenX = 0; screenX < this.game.camera.width; screenX += tileSize) {

        // get noise value for this X and Y coordinate
        let noise = this.p.noise(screenX * scale, screenY * scale, 1);

        // above center should be more likely to be transparent
        // and below more likely to be a tile
        noise *= ((screenCenterY - screenY) / screenCenterY * centerFalloff) + 1;

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
    return mapData;
  }
}

export default Terrain;
