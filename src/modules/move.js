export default function move(player, cursors) {

  player.body.velocity.x = 0;

  if (cursors.up.isDown && player.body.touching.down)
  {
    player.body.velocity.y = -350;
  }

  if (cursors.left.isDown)
  {
    player.body.velocity.x = -150;
  }
  else if (cursors.right.isDown)
  {
    player.body.velocity.x = 150;
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
    player.body.velocity.y = -350;
  }


}
