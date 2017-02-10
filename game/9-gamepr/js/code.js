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
var howToPlay = { preload : preload ,create : create2 ,update : update1};
var resultGame = {preload : preload , create : create3};
var login = {preload : preload , create : create4 ,update : update2};
var credit = {preload : preload , create : create5};
game.state.add('login',login);
game.state.add('main', main);
game.state.add('menu', menu);
game.state.add('howToPlay',howToPlay);
game.state.add('result',resultGame);
game.state.add('credit',credit);
game.state.start('login');
function preload() {
	game.load.image('wippo','images/wippo.png');
	game.load.image('sky','images/sky.png');
	game.load.image('water3','images/water3.png');
	game.load.image('water2','images/water2.png');
	game.load.image('water1','images/water1.png');
	game.load.image('oldMap','images/oldMap.png');
	game.load.image('bgHowToPlay','images/bghowtoplay.png');
	game.load.spritesheet('left','images/left.png',283,275);
	game.load.spritesheet('right','images/right.png',283,275);
	game.load.image('rope','images/rope-01.png');
	game.load.image('rope2','images/rope-02.png');
	game.load.spritesheet('report','images/report.png',2584/2,196);
	game.load.spritesheet('scoreboard','images/score.png',2584/2,196);
	game.load.spritesheet('creditButton','images/credit.png',2584/2,196);
	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	game.load.spritesheet('spacebar','images/spacebar.png',2584/2,196);
	game.load.spritesheet('enter','images/enter.png',851.33,196);
	game.load.image('logoWip','images/wip.png');
	game.load.image('bgLogin','images/login.png');
	game.load.image('gameOver','images/GAME-OVER-01.png');
	game.load.image('logo','images/escape-01.png');
    game.load.image('bgEnd','images/endState.png');
    game.load.image('bgStart','images/bg-Start.png');
    game.load.spritesheet('ship', 'images/sprite.png',500,500);
    game.load.image('kraken','images/boss.png');
    game.load.image('map','images/map.png');
    game.load.spritesheet('boom','images/boom2.png',80,90);
    game.load.spritesheet('boom2','images/boom_1.png',160,200);
    game.load.spritesheet('startButton','images/start.png',2584/2,196);
    game.load.spritesheet('howToPlayButton','images/howtoplay.png',2584/2,196);
    game.load.spritesheet('retry','images/playagain.png',2584/2,196);
    game.load.spritesheet('menu','images/mainmenu.png',2584/2,196);
    game.load.spritesheet('wranning','images/wranning.png',100,100);
    game.load.audio('Play','sound/Escape.wav');
    game.load.audio('Kraken','sound/Kraken.wav');
    game.load.audio('Death','sound/Death.wav');
    game.load.audio('buttonPush','sound/Paddling.wav');
    game.load.image('cannonball','images/enemyship.png');
    game.load.image('obj','images/tower.png');
    game.load.image('shark','images/shark.png');
    game.load.image('bottom','images/bottom.png');
    game.load.audio('Login','sound/Login.wav');
    game.load.audio('Shank','sound/Shank.wav');
    game.load.audio('BombDrop','sound/BombDrop.wav');
    game.load.audio('dKraken','sound/DeathbyKraken.wav');
    game.load.audio('dBomb','sound/DeathbyBombDrop.wav');
    game.load.audio('Warn','sound/Warn.wav');
    game.load.audio('BombAway','sound/BombAway.wav');
    game.load.audio('button','sound/pushIt.wav');
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
var death;
var water1,water2,water3;
var warnSound;
var krakenSound;
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
    game.physics.arcade.enable(floor);
    floor.body.immovable = true;
    player = this.add.sprite((game.world.width/2),(game.world.height*(2/4))+24,'obj');
    player.anchor.set(0.5);
    player.scale.setTo(0.95, 0.20);
    game.physics.arcade.enable(player);
    player.body.setCircle(40,10,-5);
    map = game.add.tileSprite(0, 0, 1960, 550, 'sky');
    water1 = game.add.tileSprite(0,550/2+50,1960,550,'water1');
    water2 = game.add.tileSprite(0,550/2+125,1960,550,'water2');
    water3 = game.add.tileSprite(0,550/2+200,1960,550,'water3');
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
    sprite = this.add.sprite(game.world.width/2,game.world.height*(2/4), 'ship');
    animJumpSprite = sprite.animations.add('jump',[2,1,0],3,true);
    animJumpSprite.onComplete.add(startAnimationMove, this);
    sprite.frame = 4;
    sprite.animations.add('jump',[2,1,0],3,true);
    sprite.animations.add('move',[8,7,6,5,4,3],24,true);
    sprite.animations.play('move');
    sprite.anchor.set(0.5);
    sprite.scale.setTo(0.25, 0.25);
    game.physics.arcade.enable(sprite);
    sprite.body.gravity.y = 980;
    sprite.body.maxVelocity.set(500);
    sprite.body.collideWorldBounds = true;
    textScore = game.add.text(20,20,"Score : "+score.toFixed(1),{fontSize : "30px",fill : "#FFFFFF"});
    textScore.stroke = "#BAB8B8";
    textScore.strokeThickness = 3;
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
    warnSound = game.add.audio('Warn');
    krakenSound = game.add.audio('Kraken');
    warnSound.onPlay.add(function () { console.log('WarnSound') });
    krakenSound.onPlay.add(function () { console.log('KrakenSound') });
    sharkSound = game.add.audio('Shank');
    bombAwaySound = game.add.audio('BombAway');
    bombDropSound = game.add.audio('BombDrop');
}
function resetBullet(bullet) {
    bullet.kill();
}
function update() {
    map.tilePosition.x -= 1;
    water1.tilePosition.x -= 0.5;
    water2.tilePosition.x += 1.5;
    water3.tilePosition.x -= 1;
    player.x=sprite.x-5;
    player.y=sprite.y;
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

    if(time%720>=480&&time%720<600){
        wranning.animations.play('play');
        if(!warnSound.isPlaying) {
            warnSound.play();
        }
    }
    if(time%720<=600){
    	wranning.frame = 0;
    	sprite.body.velocity.x -= 0.5;
     }
    else{
    	sprite.body.velocity.x -= 1.5;
        if(!krakenSound.isPlaying) {
            krakenSound.play();
        }else{
            sharkSound.volume = 0.4;
            bombAwaySound.volume = 0.4;
            bombDropSound.volume = 0.4;
            buttonPush.volume = 0.4;
        }
        
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
                buttonPush.play();
                sharkSound.volume = 0.6;
                bombAwaySound.volume = 0.6;
                bombDropSound.volume = 0.6;
                buttonPush.volume = 1;
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
            allSoundStopFx();
            death = game.add.audio('dKraken');
            death.play();
        }
    }
    if(sprite.x>game.world.width*(6/7)){
        
        game.state.start('result');
    }
    if (jump.isDown && sprite.body.touching.down) {
        console.log('zzz');
        sprite.body.velocity.y = -500;
        animJumpSprite.play(3,false);
    }
    textScore.text = "Score : "+score.toFixed(1);
}
var buttonStart;
var buttonHowTOPlay;
var buttonCredit;
var buttonScore;
var buttonReport;
var menuButton;
var music;
var bg;
var logo;
var rope;
var left;
var right;
var spacebar;
var sprite2;
var animJumpSpacebar;
var oldMap;

function create1(){ // main page
    bg = game.add.image(0,0,'bgStart');
    music.stop();
    music = game.add.audio('Login');
    music.loopFull();
    rope = game.add.image(980*(2/10),550*(2/10),'rope');
    rope.anchor.set(0.5);
    rope.scale.setTo(0.25,0.45);
    logo = game.add.image(980*(2/10),550*(2/10)+20,'logo');
    logo.anchor.set(0.5);
    logo.scale.setTo(0.25,0.25);
    buttonCredit = game.add.button(980*(2/10), 550*(6/10)+20, 'creditButton', toCredit, this,1,0,2);
    buttonStart = game.add.button(980*(2/10), 550*(4/10)+20, 'startButton', toGame, this,1,0,2);
    buttonCredit.anchor.set(0.5);
    buttonStart.anchor.set(0.5);
    buttonStart.scale.setTo(0.25, 0.25);
    buttonCredit.scale.setTo(0.25, 0.25);
    buttonHowTOPlay = game.add.button(980*(2/10),550*(5/10)+20 , 'howToPlayButton', toHowToPlay, this,1,0,2);
    buttonHowTOPlay.anchor.set(0.5);
    buttonHowTOPlay.scale.setTo(0.25,0.25);
    buttonScore = game.add.button(980*(2/10),550*(8/10)+20, 'scoreboard', toReport, this,1,0,2);
    buttonScore.anchor.set(0.5);
    buttonScore.scale.setTo(0.25,0.25);
    buttonReport = game.add.button(980*(2/10),550*(7/10)+20 , 'report', toReport, this,1,0,2);
    buttonReport.anchor.set(0.5);
    buttonReport.scale.setTo(0.25,0.25);
}
function create2(){ //how to play
	floor = game.add.sprite(0,game.world.height/2+75,'obj');
    floor.scale.setTo(9.8,0.5);
    game.physics.arcade.enable(floor);
    floor.body.immovable = true;
	game.add.image(0,0,'bgHowToPlay');
	oldMap = game.add.image(980/2,550/2,'oldMap');
	oldMap.anchor.set(0.5);
	oldMap.scale.setTo(0.22,0.22);
	text = game.add.text(980/8,550/4,"กด spacebar เพื่อกระโดด",{fontSize : "36px",fill : "#5B3B00"});
	logo = game.add.image(980/2,550*(1/4)-75,'howToPlayButton');
	logo.anchor.set(0.5);
	logo.scale.setTo(0.3,0.3);
	left = game.add.sprite(980*(3/4)-50,550*(3/4),'left');
	left.frame = 0;
	left.animations.add('do',[0,1],4,true);
	left.anchor.set(0.5);
	left.scale.setTo(0.25,0.25);
	right = game.add.image(980*(3.5/4)-50,550*(3/4),'right');
	right.anchor.set(0.5);
	right.scale.setTo(0.25,0.25);
	right.frame = 0;
	right.animations.add('do',[1,0],4,true);
	spacebar = game.add.image(980*(1.5/4)-50,550*(3/4),'spacebar');
	spacebar.frame = 0;
	animJumpSpacebar = spacebar.animations.add('jump',[1,0],2,true);
	animJumpSpacebar.onComplete.add(startAnimationMove, this);
	spacebar.anchor.set(0.5);
	spacebar.scale.setTo(0.38,0.38);
	menuButton = game.add.button(980*(1/4), 550*(3.75/4), 'menu', toMenu, this,1,0,2);
	menuButton.anchor.setTo(0.5);
	menuButton.scale.setTo(0.25,0.25);
    buttonStart = game.add.button(980*(3/4), 550*(3.75/4), 'startButton', toGame, this,1,0,2);
    buttonStart.anchor.set(0.5);
    buttonStart.scale.setTo(0.25,0.25);
    sprite = game.add.sprite(980*(2/4),550/2-150,'ship');
    sprite.anchor.set(0.5);
    sprite.scale.setTo(0.25,0.25);
    sprite.frame = 5;
    sprite.animations.add('move',[8,7,6,5,4,3],24,true);
    animJumpSprite = sprite.animations.add('jump',[2,1,0],3,true);
    animJumpSprite.onComplete.add(startAnimationMove, this);
    game.physics.arcade.enable(sprite);
    sprite.body.gravity.y = 980;
    sprite.body.maxVelocity.set(500);
    sprite.body.collideWorldBounds = true;
    sprite.animations.play('move');
    game.time.events.loop(3000, Jump, this);
    sprite2 = game.add.sprite(980*(3/4)-90,550/2-150,'ship');
    sprite2.anchor.set(0.5);
    sprite2.scale.setTo(0.25,0.25);
    sprite2.frame = 5;
    sprite2.animations.add('move',[8,7,6,5,4,3],24,true);
    sprite2.animations.play('move');
    game.physics.arcade.enable(sprite2);
    sprite2.body.gravity.y = 980;
    sprite2.body.maxVelocity.set(500);
    sprite2.body.collideWorldBounds = true;
    game.time.events.loop(3000, shipMove, this);
}
var checkMove = 0;
var textName;
var wippo;
function Jump() {
	sprite.body.velocity.y = -500;
	animJumpSprite.play(3,false);
	animJumpSpacebar.play(2,false);
}
function shipMove() {
	if(checkMove%2==0){
		left.animations.play('do');
		right.animations.play('do');
		sprite2.body.velocity.x = 70;
	}
	else{
		left.animations.stop('do');
		right.animations.stop('do');
		left.frame = 0;
		right.frame = 0;
		sprite2.body.velocity.x = -70;
	}
	checkMove++;
}

function update1() {
	game.physics.arcade.collide(sprite,floor);
	game.physics.arcade.collide(sprite2,floor);
}
function create3(){ //result
    allSoundStopFx();
    game.add.image(0,0,'bgEnd');
    music.stop();
    music = game.add.audio('Death');
    music.loopFull();
    rope = game.add.image(980/2,550*(2/10),'rope2');
    rope.anchor.set(0.5);
    rope.scale.setTo(0.25,0.35);
    logo = game.add.image(980/2,game.world.centerY-125,'gameOver');
    logo.anchor.set(0.5);
    logo.scale.setTo(0.25,0.25);
    textName = game.add.text(980/2+135,550*(1/4)+25,name,{fontSize : "48px",fill : "#5B3B00"});
    textName.anchor.set(0.5);
    textName.stroke = "#221702";
    textName.strokeThickness = 7.5;
    text = game.add.text(980/2+80+25,550*(1/4)+100,"Score : "+score.toFixed(1),{fontSize : "48px",fill : "#5B3B00"});
    text.anchor.set(0.5);
    text.stroke = "#221702";
    text.strokeThickness = 7.5;
    buttonStart = game.add.button(980/2, game.world.centerY+25+50, 'retry', toGame, this,1,0,2);
    buttonStart.anchor.set(0.5);
    buttonStart.scale.setTo(0.38,0.38);
    menuButton = game.add.button(980/2, game.world.centerY+115+75, 'menu', toMenu, this,1,0,2);
    menuButton.anchor.set(0.5);
    menuButton.scale.setTo(0.38,0.38);
    setScore();
}
function create4() { //login
	game.add.image(0,0,'bgLogin');
    logo = game.add.image(980/2,550/4,'logoWip');
    logo.anchor.setTo(0.5)
    music = game.add.audio('Login');
    music.loopFull();
    text = game.add.text(980/2,550*(1/4)+125,"เจ้าหนูผู้โชคร้าย เจ้าชื่ออะไร?",{font : "48px Kanit",fill : "#FFFFFF"});
    //@import url('fontface-thaisansneue.css');
	//@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    text.anchor.set(0.5);
    game.add.plugin(PhaserInput.Plugin);
    input = game.add.inputField(460-150, game.world.centerY-12.5+50, {
    //input = game.add.inputField(980/2, 550/2, {
        font: '22px Arial',
        fill: '#212121',
        fontWeight: 'normal',
        width: 300,
        height: 25,
        borderColor: '#000',
        textAlign: 'center',
        padding : 10,
        max : 15
    });
    menuButton = game.add.button(980/2-20, game.world.centerY+100+50, 'enter', toMenu, this,1,0,2);
    menuButton.anchor.set(0.5);
    menuButton.scale.setTo(0.25,0.25);
}
function update2() {
	if (this.input.keyboard.addKey(Phaser.KeyCode.ENTER).isDown){
        toMenu();
    }
}
function toReport() {
    window.open("https://www.facebook.com/volk.maneechote?fref=ts");
}
function buttonSound(){
    soundFx1 = game.add.audio('button');
    soundFx1.play();
    console.log(">>>>>>Hello2");
}
function create5() { //credit
	game.add.image(0,0,'bgHowToPlay');
	oldMap = game.add.image(980/2,550/2,'oldMap');
	oldMap.anchor.set(0.5);
	oldMap.scale.setTo(0.22,0.22);
	logo = game.add.image(980/2,550*(1/4)-75,'creditButton');
	logo.anchor.set(0.5);
	logo.scale.setTo(0.3,0.3);
	wippo = game.add.image(980/2+150,550/2-50,'wippo');
	wippo.anchor.set(0.5);
	game.add.text(980*(0.5/4),550*(1/4)-25,"Audio Library – No Copyright Music",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+11,"URL : goo.gl/yReazM",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+47,"Ross Bugden - Music",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+83,"URL : goo.gl/NDMy6w",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+119,"Ship sailing on the sea",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+155,"URL : goo.gl/1YpYo3",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+191,"Beach party wooden sign",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+227,"URL : goo.gl/9kzuhy",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+263,"Father and son illustration",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+299,"URL : goo.gl/js8DkX",{fontSize : "24px",fill : "#5B3B00"});
    buttonStart = game.add.button(980*(1/2),550*(3.75/4),'menu',toMenu,this,1,0,2);
    buttonStart.anchor.set(0.5);
    buttonStart.scale.setTo(0.25,0.25);
}//toCredit
function toGame() {
    buttonSound();
    game.state.start('main');
}
function toMenu() {
    buttonSound();
    game.state.start('menu');
    name = input.value;
    console.log(name);
}
function toHowToPlay() {
    buttonSound();
    game.state.start('howToPlay');
}
function toCredit() {
    buttonSound();
    game.state.start('credit');
}

function toLink() {
    window.open(linkToScore);
}

function shootThem() {
    if(cannonTimer<game.time.now){
        var output = game.rnd.integerInRange(0,20);
        bombDropSound.play();
        if(bombDropSound.isPlaying){
            bombDropSound.restart();
        }
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
   allSoundStopFx();
    death = game.add.audio('dBomb');
    death.play();
    console.log("hit by cannon"); 
    game.state.start('result');
}
function bombHitPlayer() {
    allSoundStopFx();
    death = game.add.audio('dBomb');
    death.play();
    console.log("hit by bomb");
    game.state.start('result');

}
function sharkHitPlayer() {
    allSoundStopFx();
    death = game.add.audio('dKraken');
    death.play();
    console.log("hit by shark");
    game.state.start('result');
    
}
function allSoundStopFx(){
    if(sharkSound.isPlaying){
        sharkSound.stop();
    }
    if(bombAwaySound.isPlaying){
        bombAwaySound.stop();
    }
    if(bombDropSound.isPlaying){
        bombDropSound.stop();
    }
    if(krakenSound.isPlaying){
        krakenSound.stop();
    }
    if(warnSound.isPlaying){
        warnSound.stop();
    }
}
function bombSpawn() {
    if(bombTimer<game.time.now){
        var output = game.rnd.integerInRange(0,20);
        
        if(!bombAwaySound.isPlaying){
            bombAwaySound.play();
        }
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
        sharkSound.play();
        if(!sharkSound.isPlaying){
            sharkSound.play();
        }
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