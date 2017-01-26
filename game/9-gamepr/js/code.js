var game = new Phaser.Game(980, 550, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('ship', 'images/ship.png');
	  game.load.image('kraken','images/boss.png');
    game.load.image('background','images/sea.png');
}
var sprite;

function create() {
    game.add.image(0,0,'background');
    sprite = this.add.sprite(game.world.width/2,game.world.height/2, 'ship');
    sprite.anchor.set(0.5);
    sprite.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(sprite);
    sprite.body.maxVelocity.set(500);
    //textScore = game.add.text(20,20,"Score : "+score,{fontSize : "20px",fill : "#ed3465"});
    cursors = this.input.keyboard.createCursorKeys();
    timer = game.time.create(false);
    timer.loop(3001, reposition, this);
    timer.start();
}

function update() {
    if(cursors.left.isDown){

    }
}
