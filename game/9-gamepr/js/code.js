var game = new Phaser.Game(980, 550, Phaser.AUTO, "game");
var config = {
    apiKey: "AIzaSyAhBOG3nZFT0xjOu5UPm1k-ZVot1IPEfoQ",
    authDomain: "wip-camps-game.firebaseapp.com",
    databaseURL: "https://wip-camps-game.firebaseio.com",
    storageBucket: "wip-camps-game.appspot.com",
    messagingSenderId: "768785136426"
};
firebase.initializeApp(config);
var dbEtk = firebase.database().ref().child("etk").child("web");
var name = 'ชื่อไรก็ได้ โตแล้ว';
var main = { preload : preload , create : create , update : update};
var menu = { preload : preload , create : create1};
var howToPlay = { preload : preload ,create : create2};
var resultGame = {preload : preload , create : create3};
var login = {preload : preload , create : create4};
var credit = {preload : preload , create : create5};
game.state.add('login',login);
game.state.add('main', main);
game.state.add('menu', menu);
game.state.add('howToPlay',howToPlay);
game.state.add('result',resultGame);
game.state.add('credit',credit);
game.state.start('login');
function preload() {
    game.load.image('bgStart','images/bg-Start.png');
    game.load.spritesheet('ship', 'images/player.png',500,500);
    game.load.image('kraken','images/boss.png');
    game.load.image('map','images/map.png');
    game.load.spritesheet('boom','images/boom2.png',80,90);
    game.load.spritesheet('boom2','images/boom_1.png',160,200);
    game.load.image('startButton','images/start.png');
    game.load.image('howToPlayButton','images/howtoplay.png');
    game.load.image('retry','images/retry.png');
    game.load.image('menu','images/menu.png');
    game.load.spritesheet('wranning','images/wranning.png',100,100);
    game.load.audio('Play','sound/Escape.ogg');
    game.load.audio('Kraken','sound/Kraken.ogg');
    game.load.audio('Death','sound/Death.ogg');
    game.load.audio('buttonPush','sound/Paddling.ogg');
    game.load.image('cannonball','images/enemyship.png');
    game.load.image('obj','images/tower.png');
    game.load.image('shark','images/shark.png');
    game.load.image('bottom','images/bottom.png');
    game.load.audio('Login','sound/Login.ogg');
    game.load.audio('Shank','sound/Shank.ogg');
    game.load.audio('BombDrop','sound/BombDrop.ogg');
    game.load.audio('dKraken','sound/DeathbyKraken.ogg');
    game.load.audio('dBomb','sound/DeathbyBombDrop.ogg');
    game.load.audio('Warn','sound/Warn.ogg');
    game.load.audio('BombAway','sound/BombAway.ogg');
    
}
var map;
var player;
var sprite;
var ck;
var textScore;
var score;
var boom1,boom2,boom3,boom4;
var timer;
var cannonTimer;
var time;
var wranning;
var maxSpeed;
var cannonball;
var cannonGroup;
var floor;
var jump;
var bomb;
var bombGroup;
var bombTimer;
var shark;
var sharkGroup;
var sharkTimer;
var cannonTime;
var bombTime;
var sharkTime;
var bottomship;
var animJumpSprite;
var buttonPush;
var soundFx2;
var soundFx3;
var soundFx4;
var soundFx1;
var death;
function create() {
    game.world.setBounds(0, 0, 1960, 550);
    music.stop();
    music = game.add.audio('Play');
    music.loopFull();
    score=0;
    ck=0;
    time=0;
    bombTimer=0;
    maxSpeed=50;
    cannonTimer = 0;
    bombTimer = 0;
    sharkTimer = 0;
    cannonTime = 40*60;
    bombTime = 10*60;
    sharkTime = 25*60;
    floor = game.add.sprite(0,game.world.height*(3.75/4),'obj');
    floor.scale.setTo(19.6,0.5);
    map = game.add.tileSprite(0, 0, 1960, 550, 'map');
    game.physics.arcade.enable(floor);
    floor.body.immovable = true;
    wranning = game.add.sprite(20,game.world.height*(3.5/6),'wranning');
    wranning.frame = 0;
    wranning.anchor.set(0.5);
    wranning.scale.setTo(0.25,0.25);
    wranning.animations.add('play',[0,1],4,true);
    wranning.fixedToCamera = true;
    boom1=game.add.image(game.world.width*(7/8),game.world.height*(3.5/6),'boom2');
    boom1.scale.setTo(0.6, 0.6);
    boom1.animations.add('move1', [0,1,2,3,4,5], 10, true);
    boom2=game.add.image(game.world.width*(7/8),game.world.height*(4.5/6),'boom2');
    boom2.scale.setTo(0.6, 0.6);
    boom2.animations.add('move2', [0,1,2,3,4,5], 10, true);
    boom3=game.add.image(game.world.width*(7/8)+90,game.world.height*(3.5/6),'boom2');
    boom3.scale.setTo(0.6, 0.6);
    boom3.animations.add('move1', [0,1,2,3,4,5], 10, true);
    boom4=game.add.image(game.world.width*(7/8)+90,game.world.height*(4.5/6),'boom2');
    boom4.scale.setTo(0.6, 0.6);
    boom4.animations.add('move1', [0,1,2,3,4,5], 10, true);
    boom1.frame = 0;
    boom2.frame = 0;
    boom3.frame = 0;
    boom4.frame = 0;
    kraken = game.add.image(0,game.world.height*(1/4),'kraken');
    kraken.scale.setTo(0.2,0.2);
    player = this.add.sprite((game.world.width/2),(game.world.height*(2/4))+24,'obj');
    player.anchor.set(0.5);
    player.scale.setTo(0.95, 0.20);
    game.physics.arcade.enable(player);
    player.body.setCircle(40,10,-5);
    sprite = this.add.sprite(game.world.width/2,game.world.height*(2/4), 'ship');
    animJumpSprite = sprite.animations.add('jump',[2,1,0],3,true);
    animJumpSprite.onComplete.add(startAnimationMove, this);
    sprite.frame = 4;
    sprite.animations.add('jump',[2,1,0],3,true);
    sprite.animations.add('move',[4,3],3,true);
    sprite.animations.play('move');
    sprite.anchor.set(0.5);
    sprite.scale.setTo(0.25, 0.25);
    game.physics.arcade.enable(sprite);
    sprite.body.gravity.y = 980;
    sprite.body.maxVelocity.set(500);
    sprite.body.collideWorldBounds = true;
    textScore = game.add.text(20,20,"Score : "+score.toFixed(1),{fontSize : "20px",fill : "#ed3465"});
    textScore.fixedToCamera = true;
    cursors = this.input.keyboard.createCursorKeys();
    jump = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.camera.follow(sprite);
    cannonGroup = game.add.group();
    cannonGroup.enableBody = true;
    cannonGroup.physicsBodyType = Phaser.Physics.ARCADE;
    cannonball = cannonGroup.create(0,0,'cannonball');
    cannonball.exists = false;
    cannonball.visible = false;
    cannonball.checkWorldBounds = true;
    cannonball.events.onOutOfBounds.add(resetBullet, this);
    cannonball.body.setCircle(20,0,-10);
    bombGroup = game.add.group();
    bombGroup.enableBody = true;
    bombGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for(var i = 0;i<16;i++){
        bomb = bombGroup.create(0,0,'boom');
        bomb.scale.setTo(0.7, 0.7);
        bomb.exists = false;
        bomb.visible = false;
        bomb.checkWorldBounds = true;
        bomb.events.onOutOfBounds.add(resetBullet, this);
        bomb.body.setCircle(45);
    }
    bombGroup.callAll('animations.add', 'animations', 'move', [0,1,2,3,4], 10, true);
    sharkGroup = game.add.group();
    sharkGroup.enableBody = true;
    sharkGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for(var i = 0;i<16;i++){
        bomb = sharkGroup.create(0,0,'shark');
        bomb.exists = false;
        bomb.visible = false;
        bomb.checkWorldBounds = true;
        bomb.body.bounce.y = 1;
        bomb.scale.setTo(0.1, 0.1);
        bomb.anchor.set(0.5);
        bomb.events.onOutOfBounds.add(resetBullet, this);
        bomb.body.setCircle(25);
    }
    bottomship = game.add.image(1861,0,'bottom');
}
function resetBullet(bullet) {
    bullet.kill();
}
function update() {
    map.tilePosition.x -= 1;
    player.x=sprite.x-5;
    player.y=sprite.y+42;
    game.physics.arcade.overlap(player,cannonGroup, cannonHitPlayer, null , this);
    game.physics.arcade.overlap(player,bombGroup, bombHitPlayer, null , this);
    game.physics.arcade.collide(sprite,floor);
    game.physics.arcade.collide(sharkGroup,floor);
    game.physics.arcade.overlap(player,sharkGroup, sharkHitPlayer, null , this);
    boom1.animations.play('move1');
    boom2.animations.play('move2');
    boom3.animations.play('move1');
    boom4.animations.play('move1');
    if(bombTime<=0){
        bombSpawn();
    }
    if(cannonTime<=0){
        shootThem();
    }
    if(sharkTime<=0){
        sharkSpawn();
    }
    cannonTime--;
    bombTime--;
    sharkTime--;
    if(time%720>=540){
        wranning.animations.play('play');
        soundFx1= game.add.audio('Warn');
        soundFx1.play();
    }
    if(time%720<=600){
    	wranning.frame = 0;
    	sprite.body.velocity.x -= 0.5;
        
   
     }
    else{
    	sprite.body.velocity.x -= 1.5;
        soundFx1.stop();
        soundFx1= game.add.audio('Kraken');
        soundFx1.play();
    }
    time++;
    if(sprite.body.velocity.x<=maxSpeed){
        if(cursors.right.isDown){
            ck=1;
            buttonPush=  game.add.audio('buttonPush');
        }
        if(ck==1){
        	if(cursors.left.isDown&&(!cursors.right.isDown)){
        		ck=2;
                buttonPush.stop();
                buttonPush.play();
        	}
        }
        if(ck==2){
            console.log("<<<<");
            ck=0;
            score+=0.5;
            sprite.body.velocity.x +=20;
        }
    }
    if(sprite.x<game.world.width*(1/2)){
        console.log(">>>");
        if(sprite.x<250){
            game.state.start('result');
        }
    }
    if(sprite.x>game.world.width*(6/7)){
        death = game.add.audio('dKraken');
        death.play();
        game.state.start('result');
    }
    if (jump.isDown && sprite.body.touching.down) {
        console.log('zzz');
        sprite.body.velocity.y = -500;
        animJumpSprite.play(3,false);
    }
    textScore.text = "Score : "+score.toFixed(1);
}
var buttonCredit;
var buttonStart;
var buttonHowTOPlay;
var buttonCredit;
var menuButton;
var music;
var bg;
function create1(){ // main page
    bg = game.add.image(0,0,'bgStart');
    music.stop();
    music = game.add.audio('Login');
    music.loopFull();
    buttonCredit = game.add.button(980*(3/10),550*(8/10) , 'startButton', toCredit, this);
    buttonStart = game.add.button(980*(5/10), 550*(8/10), 'startButton', toGame, this);
    buttonCredit.anchor.set(0.5);
    buttonStart.anchor.set(0.5);
    buttonHowTOPlay = game.add.button(980*(7/10), 550*(8/10), 'howToPlayButton', toHowToPlay, this);
    buttonHowTOPlay.anchor.set(0.5);
}
function create2(){ //how to play
    buttonStart = game.add.button(400, game.world.centerY, 'startButton', toGame, this);
    buttonStart.anchor.set(0.5);
}
function create3(){ //result
    music.stop();
    music = game.add.audio('Death');
    music.loopFull();
    text = game.add.text(980/2,game.world.centerY*(1/4),"Score : "+score.toFixed(1),{fontSize : "20px",fill : "#ed3465"});
    text.anchor.set(0.5);
    text.scale.setTo(2,2);
    buttonStart = game.add.button(980/2, game.world.centerY, 'retry', toGame, this);
    buttonStart.anchor.set(0.5);
    menuButton = game.add.button(980/2, game.world.centerY+100, 'menu', toMenu, this);
    menuButton.anchor.set(0.5);
    setScore();
}
function create4() { //login
    music = game.add.audio('Login');
    music.loopFull();
    game.add.plugin(PhaserInput.Plugin);
    input = game.add.inputField(game.world.centerX-150, game.world.centerY-12.5, {
    //input = game.add.inputField(980/2, 550/2, {
        font: '22px Arial',
        fill: '#212121',
        fontWeight: 'normal',
        width: 300,
        height: 25,
        borderColor: '#000',
        textAlign: 'center',
        padding : 10,
        max : 20
    });
    menuButton = game.add.button(980/2, game.world.centerY+100, 'menu', toMenu, this);
    menuButton.anchor.set(0.5);
    //input.anchor.set(0.5);
}
function create5() { //credit
    menuButton = game.add.button(980/2, game.world.centerY+100, 'menu', toMenu, this);
    menuButton.anchor.set(0.5);
}
function toGame() {
    game.state.start('main');
}
function toMenu() {
    game.state.start('menu');
    name = input.value;
    console.log(name);
}
function toHowToPlay() {
    game.state.start('howToPlay');
}
function toCredit() {
    game.state.start('credit');
}

function toLink() {
    window.open(linkToScore);
}

function shootThem() {
    if(cannonTimer<game.time.now){
        var output = game.rnd.integerInRange(0,20);
        var soundFx3 = game.add.audio('BombDrop');
        soundFx3.play();
        if(output == 0){
            cannonTimer = game.time.now + 10000;
            var range = game.rnd.integerInRange(-200, 200);
            bullet = cannonGroup.getFirstExists(false);
            bullet.reset(sprite.x+range, 0);
            bullet.body.velocity.y = 100;
        }
    }
}
function cannonHitPlayer() {
    death = game.add.audio('dBomb');
    death.play();
    console.log("hit by cannon"); 
    game.state.start('result');
}
function bombHitPlayer() {
    death = game.add.audio('dBomb');
    death.play();
    console.log("hit by bomb");
    game.state.start('result');

}
function sharkHitPlayer() {
    death = game.add.audio('dKraken');
    death.play();
    console.log("hit by shark");
    game.state.start('result');
    
}
function bombSpawn() {
    if(bombTimer<game.time.now){
        var output = game.rnd.integerInRange(0,20);
        soundFx4 = game.add.audio('BombAway');
        soundFx4.play();
        if(output == 0){
            bombTimer = game.time.now + 5000;
            bomby = bombGroup.getFirstExists(false);
            bomby.reset(1700, game.world.height*(3.75/4)-50);
            bomby.body.velocity.x = -200;
            bombGroup.callAll('animations.play', 'animations', 'move');
        }
    }
}

function sharkSpawn() {
    if(sharkTimer<game.time.now){
        var output = game.rnd.integerInRange(0,20);
        soundFx2 = game.add.audio('Shank');
        soundFx2.play();
        if(output == 0){
            sharkTimer = game.time.now + 8000;
            bomby = sharkGroup.getFirstExists(false);
            bomby.reset(1850, game.world.height*(1/6));
            bomby.body.gravity.y = 500;
            bomby.body.velocity.x = -200;
        }
    }
}
function startAnimationMove() {
  sprite.play('move');
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> database function

function setScore() {
    var highscore;
    console.log(name);
    var etk = dbEtk.child(name);
    etk.on('value', function(snapshot) {
        highscore = snapshot.val().highscore;
    });

    console.log(highscore);

    if(highscore < score || highscore === undefined){
        dbEtk.child(name).update(
            {
                 "score" : score,
                 "highscore" : score
            }
        );
        console.log("set highscore complete");
    }else{
        dbEtk.child(name).update(
             {
                 "score" : score
             }
        );
    }
     console.log("set score complete");

     
}
    function bgmStop(){
        this
    }



