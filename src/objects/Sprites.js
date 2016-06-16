class Sprites {

  constructor(game){
    var self = this;
    self.game = game;
    this.pixelWidth = 6;
    this.pixelHeight = 6;

    this.create = function(sprite, key) {
      this.game.create.texture(key, sprite, this.pixelWidth, this.pixelHeight);
      var thisSprite = this.game.add.sprite(300, 300, key);
      return thisSprite;
    }
  }

  duck() {
    var duckie = [
      '...55.......',
      '.....5......',
      '...7888887..',
      '..788888887.',
      '..888088808.',
      '..888886666.',
      '..8888644444',
      '..8888645555',
      '888888644444',
      '88788776555.',
      '78788788876.',
      '56655677776.',
      '456777777654',
      '.4........4.'
    ];
    return this.create(duckie, 'duck');
  }



}

export default Sprites;
