var p = new Processing();
var noiseScale = 0.8;
var color = 5;
var pixelWidth = 80;
var pixelHeight = 30;
var counter = 0;


export default function draw(game, group) {
  p.background(250, 45, 250);

  for(var x=0; x < p.width; x++) {
    var noiseVal = p.noise((p.mouseX+x)*noiseScale,
    p.mouseY*noiseScale);
    buildTiles(noiseVal, game, group);
  }
};

function buildTiles(noiseVal, game, group) {
  var arr = []
  for(var y=0; y < (noiseVal*10)-1; y++) {
    arr.push('5');
  }
  arr.push('5');
  createImmovable(group, arr, 'ground' + counter, game);
  createImmovable(group, arr, 'ground' + counter, game);
}

function createImmovable(group, sprite, key, game) {
  var structure = game.create.texture(key, sprite, pixelWidth, pixelHeight);
  var ground = group.create(counter*40, game.world.height, structure);
  ground.body.immovable = true;
  ground.scale.setTo(1, 2);
  ground.anchor.setTo(0, 1);
  counter += 1;
}
