// Firebase config
var config = {
    apiKey: "AIzaSyAhBOG3nZFT0xjOu5UPm1k-ZVot1IPEfoQ",
    authDomain: "wip-camps-game.firebaseapp.com",
    databaseURL: "https://wip-camps-game.firebaseio.com",
    storageBucket: "wip-camps-game.appspot.com",
    messagingSenderId: "768785136426"
};
firebase.initializeApp(config);
// end Firebase config

// State Management
var game = new Phaser.Game(980, 550, Phaser.AUTO, "game");

var login = {preload : preload , create : createLogin ,update : updateLogin};

var menu = { preload : preload , create : createMenu};
var howToPlay = { preload : preload ,create : createHowToPlay ,update : updateHowToPlay};
var credit = {preload : preload , create : createCredit};

var gameplay = { preload : preload , create : createGameplay , update : updateGameplay};

var resultGame = {preload : preload , create : createResult};

game.state.add('login',login);
game.state.add('menu', menu);
game.state.add('howToPlay',howToPlay);
game.state.add('credit',credit);

game.state.add('gameplay', gameplay);

game.state.add('result',resultGame);

game.state.start('login');
//end State Management

// Preload function : [login,menu,gameplay,howToPlay,result,credit]

function preload() {
	game.load.spritesheet('enemyShip','images/enemyShip.png',600,400);
    game.load.spritesheet('boom','images/boom.png',80,90);
    game.load.spritesheet('boomGroup','images/boom-group.png',160,200);
    game.load.spritesheet('menu','images/mainmenu.png',2584/2,196);
    game.load.spritesheet('warnning','images/warnning.png',100,100);
    game.load.spritesheet('playership', 'images/playership.png',500,500);
	game.load.spritesheet('left','images/left.png',283,275);
	game.load.spritesheet('right','images/right.png',283,275);
	game.load.spritesheet('report','images/report.png',2584/2,196);
	game.load.spritesheet('scoreboard','images/score.png',2584/2,196);
	game.load.spritesheet('spacebar','images/spacebar.png',2584/2,196);
	game.load.spritesheet('enter','images/enter.png',851.33,196);
    game.load.spritesheet('startButton','images/start.png',2584/2,196);
    game.load.spritesheet('howToPlayButton','images/howtoplay.png',2584/2,196);
	game.load.spritesheet('creditButton','images/credit.png',2584/2,196);
    game.load.spritesheet('playagain','images/playagain.png',2584/2,196);
	
	game.load.image('wippo','images/wippo.png');
	game.load.image('sky','images/sky.png');
	game.load.image('water_bot','images/water_bot.png');
	game.load.image('water_mid','images/water_mid.png');
	game.load.image('water_top','images/water_top.png');
	game.load.image('oldMap','images/oldMap.png');
	game.load.image('logoWip','images/wip.png');
	game.load.image('bgLogin','images/login.png');
	game.load.image('gameOver','images/GAME-OVER-01.png');
	game.load.image('logoGame','images/escape-01.png');
	game.load.image('bgHowToPlay','images/bghowtoplay.png');
    game.load.image('bgEnd','images/endState.png');
    game.load.image('bgStart','images/bg-Start.png');
    game.load.image('kraken','images/boss.png');
    game.load.image('map','images/map.png');
	game.load.image('ropeResult','images/rope-02.png');
	game.load.image('ropeMenu','images/rope-01.png');
    game.load.image('cannonball','images/cannonball.png');
    game.load.image('obj','images/object.png');
    game.load.image('shark','images/shark.png');
    game.load.image('bottom','images/bottom.png');

    game.load.audio('Play','sound/Escape.wav');
    game.load.audio('Kraken','sound/Kraken.wav');
    game.load.audio('Death','sound/Death.wav');
    game.load.audio('buttonPush','sound/Paddling.wav');
    game.load.audio('Login','sound/Login.wav');
    game.load.audio('Shark','sound/Shark.wav');
    game.load.audio('BombDrop','sound/BombDrop.wav');
    game.load.audio('dKraken','sound/DeathbyKraken.wav');
    game.load.audio('dBomb','sound/DeathbyBombDrop.wav');
    game.load.audio('Warn','sound/Warn.wav');
    game.load.audio('BombAway','sound/BombAway.wav');
    game.load.audio('button','sound/pushIt.wav');

	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

// end Preload function

// Declare Global variable
var name = "พี่ Wippo";
var map;
var player;
var playership;
var ck;
var textScore;
var score;
var boomGroup;
var timer;
var cannonTimer;
var time;
var warnning;
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
var playershipJump;
var buttonPush;
var death;
var water_top,water_mid,water_bot;
var warnSound;
var krakenSound;
var enemy;
var enemyAnimations;
var buttonStart;
var buttonHowTOPlay;
var buttonCredit;
var buttonScore;
var buttonReport;
var menuButton;
var music;
var bg;
var logoGame;
var ropeMenu;
var left;
var right;
var spacebar;
var playershipEx;
var animJumpSpacebar;
var oldMap;
var checkMove;
var textName;
var wippo;
var message;
var random;
// end Declare Global variable

// CreateGameplay function
function createGameplay() {
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
    enemy = game.add.image(980*(1.5/4),550/2,'enemyShip');
    enemy.frame = 0;
    enemyAnimations = enemy.animations.add('play',[0,1,2,3,0],5,true);
    water_top = game.add.tileSprite(0,550/2+50,1960,550,'water_top');
    water_mid = game.add.tileSprite(0,550/2+125,1960,550,'water_mid');
    water_bot = game.add.tileSprite(0,550/2+200,1960,550,'water_bot');
    warnning = game.add.sprite(20,game.world.height*(3.5/6),'warnning');
    warnning.frame = 0;
    warnning.anchor.set(0.5);
    warnning.scale.setTo(0.25,0.25);
    warnning.animations.add('play',[0,1],4,true);
    warnning.fixedToCamera = true;

    boomGroup=game.add.image(game.world.width*(7/8)+90,game.world.height*(4.5/6),'boomGroup');
    boomGroup.scale.setTo(0.6, 0.6);
    boomGroup.animations.add('move', [0,1,2,3,4,5], 10, true);
    boomGroup.frame = 0;

    kraken = game.add.image(0,game.world.height*(1/4),'kraken');
    kraken.scale.setTo(0.2,0.2);
    enemy.anchor.setTo(0.5);
    enemy.fixedToCamera = true;
    playership = this.add.sprite(game.world.width/2,game.world.height*(2/4), 'playership');
    playershipJump = playership.animations.add('jump',[2,1,0],3,true);
    playershipJump.onComplete.add(startAnimationMove, this);
    playership.frame = 4;
    playership.animations.add('jump',[2,1,0],3,true);
    playership.animations.add('move',[8,7,6,5,4,3],24,true);
    playership.animations.play('move');
    playership.anchor.set(0.5);
    playership.scale.setTo(0.25, 0.25);
    game.physics.arcade.enable(playership);
    playership.body.gravity.y = 980;
    playership.body.maxVelocity.set(500);
    playership.body.collideWorldBounds = true;
    textScore = game.add.text(20,20,"Score : "+score,{fontSize : "30px",fill : "#FFFFFF"});
    textScore.stroke = "#BAB8B8";
    textScore.strokeThickness = 3;
    textScore.fixedToCamera = true;
	text = game.add.text(20,50,"HighScore : "+getHighScore(),{fontSize : "24px",fill : "#FFFFFF"});
    text.stroke = "#BAB8B8";
    text.strokeThickness = 2;
    text.fixedToCamera = true;

    cursors = this.input.keyboard.createCursorKeys();
    jump = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.camera.follow(playership);
    cannonGroup = game.add.group();
    cannonGroup.enableBody = true;
    cannonGroup.physicsBodyType = Phaser.Physics.ARCADE;
    cannonball = cannonGroup.create(0,0,'cannonball');
    cannonball.scale.setTo(0.4,0.4);
    cannonball.exists = false;
    cannonball.visible = false;
    cannonball.checkWorldBounds = true;
    cannonball.events.onOutOfBounds.add(resetBullet, this);
    cannonball.body.setCircle(15,0,-10);
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
        shark = sharkGroup.create(0,0,'shark');
        shark.exists = false;
        shark.visible = false;
        shark.checkWorldBounds = true;
        shark.body.bounce.y = 1;
        shark.scale.setTo(0.1, 0.1);
        shark.anchor.set(0.5);
        shark.events.onOutOfBounds.add(resetBullet, this);
        shark.body.setCircle(25);
    }
    bottomship = game.add.image(1861,0,'bottom');
    warnSound = game.add.audio('Warn');
    krakenSound = game.add.audio('Kraken');
    warnSound.onPlay.add(function () { console.log('WarnSound') });
    krakenSound.onPlay.add(function () { console.log('KrakenSound') });
    sharkSound = game.add.audio('Shark');
    bombAwaySound = game.add.audio('BombAway');
    bombDropSound = game.add.audio('BombDrop');
}

//end createGameplay function

// updateGameplay function
function updateGameplay() {
    map.tilePosition.x -= 1;
    water_top.tilePosition.x -= 1;
    water_mid.tilePosition.x -= 2;
    water_bot.tilePosition.x -= 3;
    player.x=playership.x-5;
    player.y=playership.y;
    game.physics.arcade.overlap(player,cannonGroup, cannonHitPlayer, null , this);
    game.physics.arcade.overlap(player,bombGroup, bombHitPlayer, null , this);
    game.physics.arcade.collide(playership,floor);
    game.physics.arcade.collide(sharkGroup,floor);
    game.physics.arcade.overlap(player,sharkGroup, sharkHitPlayer, null , this);

    boomGroup.animations.play('move');
 
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
        warnning.animations.play('play');
        if(!warnSound.isPlaying) {
            warnSound.play();
        }
    }
    if(time%720<=600){
    	warnning.frame = 0;
    	playership.body.velocity.x -= 0.5;
     }
    else{

    	playership.body.velocity.x -= 1.5;
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
    if(playership.body.velocity.x<=maxSpeed){
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
            ck=0;
            score+=5;
            playership.body.velocity.x +=20;
        }
    }

    if(playership.x<game.world.width*(1/2)){    
        if(playership.x<250){
            game.state.start('result');
            allSoundStopFx();
            death = game.add.audio('dKraken');
            death.play();
        }
    }

    if(playership.x>game.world.width*(6/7)){
        
        game.state.start('result');
    }

    if (jump.isDown && playership.body.touching.down) {
        playership.body.velocity.y = -500;
        playershipJump.play(3,false);
    }
    textScore.text = "Score : "+score;
}

//end updateGameplay function

//Support function GameplayState
function resetBullet(bullet) {
    bullet.kill();
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
function shootThem() {
    if(cannonTimer<game.time.now){
        var output = game.rnd.integerInRange(0,20);
        bombDropSound.play();
        if(bombDropSound.isPlaying){
            bombDropSound.restart();
        }
        if(output == 0){
            enemyAnimations.play(5,false);
            cannonTimer = game.time.now + 10000;
            var range = game.rnd.integerInRange(-200, 200);
            bullet = cannonGroup.getFirstExists(false);
            bullet.reset(playership.x+range, 0);
            bullet.body.velocity.y = 100;
        }
    }
}
// end support function GameplayState

// createMenu fucntion
function createMenu(){ // menu page
    bg = game.add.image(0,0,'bgStart');
    music.stop();
    music = game.add.audio('Login');
    music.loopFull();
    ropeMenu = game.add.image(980*(2/10),550*(2/10),'ropeMenu');
    ropeMenu.anchor.set(0.5);
    ropeMenu.scale.setTo(0.25,0.45);
    logoGame = game.add.image(980*(2/10),550*(2/10)+20,'logoGame');
    logoGame.anchor.set(0.5);
    logoGame.scale.setTo(0.25,0.25);
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

// end createMenu function
//////////////////////////////////////////////////////////////////////////////////

// createHowToPlay function
function createHowToPlay(){ //how to play
	checkMove = 0;
	floor = game.add.sprite(0,game.world.height/2+75,'obj');
    floor.scale.setTo(9.8,0.5);
    game.physics.arcade.enable(floor);
    floor.body.immovable = true;
	game.add.image(0,0,'bgHowToPlay');
	oldMap = game.add.image(980/2,550/2,'oldMap');
	oldMap.anchor.set(0.5);
	oldMap.scale.setTo(0.22,0.22);
	text = game.add.text(980/8+19.4,550/4+5,"กด spacebar เพื่อกระโดด",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(5/8)-29.4,550/4+5,"กดซ้ายและขวาสลับกัน",{fontSize : "24px",fill : "#5B3B00"});
	game.add.text(980*(5/8)-5-29.4,550/4+36+5,"เพื่อเคลื่อนที่ไปด้านหน้า",{fontSize : "24px",fill : "#5B3B00"});
	logoGame = game.add.image(980/2,550*(1/4)-55,'howToPlayButton');
	logoGame.anchor.set(0.5);
	logoGame.scale.setTo(0.3,0.3);
	left = game.add.sprite(980*(3/4)-35-29.4,550*(3/4)-15,'left');
	left.frame = 0;
	left.animations.add('do',[0,1],4,true);
	left.anchor.set(0.5);
	left.scale.setTo(0.18,0.18);
	right = game.add.image(980*(3.5/4)-85-29.4,550*(3/4)-15,'right');
	right.anchor.set(0.5);
	right.scale.setTo(0.18,0.18);
	right.frame = 0;
	right.animations.add('do',[1,0],4,true);
	spacebar = game.add.image(980*(1/4)+29.4,550*(3/4)-15,'spacebar');
	spacebar.frame = 0;
	animJumpSpacebar = spacebar.animations.add('jump',[1,0],2,true);
	animJumpSpacebar.onComplete.add(startAnimationMove, this);
	spacebar.anchor.set(0.5);
	spacebar.scale.setTo(0.2,0.25);
	menuButton = game.add.button(980*(1/4)+29.4, 550*(3.75/4)-35, 'menu', toMenu, this,1,0,2);
	menuButton.anchor.setTo(0.5);
	menuButton.scale.setTo(0.25,0.25);
    buttonStart = game.add.button(980*(3/4)-29.4, 550*(3.75/4)-35, 'startButton', toGame, this,1,0,2);
    buttonStart.anchor.set(0.5);
    buttonStart.scale.setTo(0.25,0.25);
    playership = game.add.sprite(980*(1/4)+29.4,550/2-150,'playership');
    playership.anchor.set(0.5);
    playership.scale.setTo(0.25,0.25);
    playership.frame = 5;
    playership.animations.add('move',[8,7,6,5,4,3],24,true);
    playershipJump = playership.animations.add('jump',[2,1,0],3,true);
    playershipJump.onComplete.add(startAnimationMove, this);
    game.physics.arcade.enable(playership);
    playership.body.gravity.y = 980;
    playership.body.maxVelocity.set(500);
    playership.body.collideWorldBounds = true;
    playership.animations.play('move');
    game.time.events.loop(3000, Jump, this);
    

    playershipEx = game.add.sprite(980*(3/4)-115-29.4,550/2-150,'playership');
    playershipEx.anchor.set(0.5);
    playershipEx.scale.setTo(0.25,0.25);
    playershipEx.frame = 5;
    playershipEx.animations.add('move',[8,7,6,5,4,3],24,true);
    playershipEx.animations.play('move');
    game.physics.arcade.enable(playershipEx);
    playershipEx.body.gravity.y = 980;
    playershipEx.body.maxVelocity.set(500);
    playershipEx.body.collideWorldBounds = true;
    game.time.events.loop(3000, shipMove, this);
}
// end createHowtoPlay function

// updateHowtoPlay function
function updateHowToPlay() {
	game.physics.arcade.collide(playership,floor);
	game.physics.arcade.collide(playershipEx,floor);
}
//end updateHowtoPlay function

//Support function howtoplay state
function Jump() {
	playership.body.velocity.y = -500;
	playershipJump.play(3,false);
	animJumpSpacebar.play(2,false);
}
function shipMove() {
	if(checkMove%2==0){
		left.animations.play('do');
		right.animations.play('do');
		playershipEx.body.velocity.x = 70;
	}
	else{
		left.animations.stop('do');
		right.animations.stop('do');
		left.frame = 0;
		right.frame = 0;
		playershipEx.body.velocity.x = -70;
	}
	checkMove++;
}
// end support function howtoplay state

// createResult function
function createResult(){ //result
    allSoundStopFx();
    game.add.image(0,0,'bgEnd');
    music.stop();
    music = game.add.audio('Death');
    music.loopFull();
    ropeResult = game.add.image(980/2,550*(2/10),'ropeResult');
    ropeResult.anchor.set(0.5);
    ropeResult.scale.setTo(0.2,0.35);
    logoGame = game.add.image(980/2,game.world.centerY-125,'gameOver');
    logoGame.anchor.set(0.5);
    logoGame.scale.setTo(0.25,0.25);
    textName = game.add.text(980/2+135,550*(1/4)+25,name,{fontSize : "48px",fill : "#5B3B00"});
    textName.anchor.set(0.5);
    textName.stroke = "#221702";
    textName.strokeThickness = 7.5;
    text = game.add.text(980/2+80+25,550*(1/4)+100,"Score : "+score,{fontSize : "48px",fill : "#5B3B00"});
    text.anchor.set(0.5);
    text.stroke = "#221702";
    text.strokeThickness = 7.5;
    buttonStart = game.add.button(980/2, game.world.centerY+25+50-20, 'playagain', toGame, this,1,0,2);
    buttonStart.anchor.set(0.5);
    buttonStart.scale.setTo(0.3,0.3);
    menuButton = game.add.button(980/2, 550/2+115+125-55, 'menu', toMenu, this,1,0,2);
    menuButton.anchor.set(0.5);
    menuButton.scale.setTo(0.3,0.3);
    buttonScore = game.add.button(980/2,game.world.centerY+115+25-20, 'scoreboard', toReport, this,1,0,2);
    buttonScore.anchor.set(0.5);
    buttonScore.scale.setTo(0.3,0.3);
    setScore();
}
// end createResult function

// createLogin function
function createLogin() { //login
	random = 0;
	game.add.image(0,0,'bgLogin');
    logoGame = game.add.image(980/2,550/4,'logoWip');
    logoGame.anchor.setTo(0.5)
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
    message = game.add.text(980/2-20,game.world.centerY+100+125,"",{font : "48px Kanit",fill : "#FFFFFF"});
    message.anchor.set(0.5);
}
//end createLogin function

// updateLogin function
function updateLogin() {
	if (this.input.keyboard.addKey(Phaser.KeyCode.ENTER).isDown){
    	toMenu();
    }
}
//end updateLogin function

// createCredit function
function createCredit() { //credit
	game.add.image(0,0,'bgHowToPlay');
	oldMap = game.add.image(980/2,550/2,'oldMap');
	oldMap.anchor.set(0.5);
	oldMap.scale.setTo(0.22,0.22);
	logoGame = game.add.image(980/2,550*(1/4)-65,'creditButton');
	logoGame.anchor.set(0.5);
	logoGame.scale.setTo(0.3,0.3);
	wippo = game.add.image(980/2+150,550/2-55,'wippo');
	wippo.anchor.set(0.5);
	game.add.text(980*(0.5/4),550*(1/4)-25+10,"Audio Library – No Copyright Music",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+5+10,"URL : goo.gl/yReazM",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+35+10,"Ross Bugden - Music",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+65+10,"URL : goo.gl/NDMy6w",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+95+10,"Ship sailing on the sea",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+125+10,"URL : goo.gl/1YpYo3",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+155+10,"Beach party wooden sign",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+185+10,"URL : goo.gl/9kzuhy",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+215+10,"Father and son illustration",{fontSize : "20px",fill : "#5B3B00"});
	game.add.text(980*(0.5/4),550*(1/4)+245+10,"URL : goo.gl/js8DkX",{fontSize : "20px",fill : "#5B3B00"});
    buttonStart = game.add.button(980*(1/2),550*(3.75/4)-35,'menu',toMenu,this,1,0,2);
    buttonStart.anchor.set(0.5);
    buttonStart.scale.setTo(0.25,0.25);
}//toCredit

// end createCredit function

// Link state function
function toReport() {
    window.open("https://www.facebook.com/volk.maneechote?fref=ts");
}
function toGame() {
    buttonSound();
    game.state.start('gameplay');
}
function toMenu() {
	console.log('name : '+input.value);
	if(input.value!=""){
	    buttonSound();
	    game.state.start('menu');
	    name = input.value;
	    console.log(name);
	}
	else{
		if(random==0)
			message.text = "บอกชื่อของเจ้ามาก่อน";
		else if(random==1)
			message.text = "นี่ถามไม่ตอบเรอะ !!";
		else if(random==2)
			message.text = "เจ้าควรตอบคำถามข้านะ";
		else if(random==3)
			message.text = "ยัง ยังอีก";
		else if(random==4)
			message.text = "เจ้าทำให้ข้าหงุดหงิดนะ";
		else if(random == 5)
			message.text = "ข้าไหว้ละ";
		else if(random == 6)
			message.text = "บอกข้าเถอะข้าขอร้อง";
		else if(random == 7)
			message.text = "นร้า นร้า ๆ";
		else if(random == 8)
			message.text = "ถ้าไม่บอกข้าจะงอนแล้วนะ -*-";
		else if(random == 9)
			message.text = "เชอะ!";
		else if(random == 10)
			window.close();
		random++;
	}
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
// end link state function

// sound function
function buttonSound(){
    soundFx1 = game.add.audio('button');
    soundFx1.play();
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

//end sound function

// animation function
function startAnimationMove() {
  playership.play('move');
}
//end animation function

// Firebase function
var highscore;
var dbEtk = firebase.database().ref().child("etk").child("web");
    
function getHighScore() {
	var etk = dbEtk.child(name);
    etk.on('value', function(snapshot) {
        highscore = snapshot.val().highscore;
    });
    if (highscore==undefined) {
    	highscore=0.0;
    }
    return highscore;
}

function setScore() {
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
// end Firebase funtion