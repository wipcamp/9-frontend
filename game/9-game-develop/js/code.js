var game = new Phaser.Game(337.5, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
var manu = { preload : preload , create : create1 , update : update1};
var htp = { preload : preload , create : create2 , update : update1};
var postScore = {preload : preload , create : create3 , update : update1}
game.state.add('main', main);
game.state.add('manu', manu);
game.state.add('htp', htp);
game.state.add('postScore',postScore);
game.state.start('manu');
function preload() {
	game.load.image('collider','9-game-develop/images/collider.png');
    game.load.image('bullet', '9-game-develop/images/bullet.png');
    game.load.image('ship', '9-game-develop/images/ship.png');
	game.load.image('boss','9-game-develop/images/boss.png');
    game.load.image('enemy_ship','9-game-develop/images/enemyship.png');
    game.load.image('background','9-game-develop/images/sea.png');
    game.load.image('laser','9-game-develop/images/biglaser.png');
    game.load.image('start','9-game-develop/images/start.png');
    game.load.image('howtoplay','9-game-develop/images/howtoplay.png');
    game.load.audio('Play','9-game-develop/sound/WhilePlay.ogg');
    game.load.audio('Died','9-game-develop/sound/You Died.ogg');
    game.load.audio('intro','9-game-develop/sound/Interface.ogg');
    //game.load.audio('ENshot','sound/EnemyShot(Normal).wav');
    game.load.audio('Death','9-game-develop/sound/Aftergethit.ogg');
    game.load.audio('BossDeath','9-game-develop/sound/BossDeath.ogg');
    game.load.audio('ENdestroy','9-game-develop/sound/EnemyShot(Normal).ogg');
}
var plan,p1,p2;
var destroyedCount=0;
var wave=-1;
var enemy;
var enemyBullets;
var bossBullets1;
var bossBullets2;
var bossBullets3;
var bossBullets4;
var bossBullets5;
var sprite,sprite2;
var weapon;
var weapon2;
var cursors;
var fireButton;
var laserBeam1,laserBeam2,laserBeam3;
var timer,total=0;
var randPositionX=[];
var randPositionY=[];
var bullets;
var countRound = 0;
var fireRate = 100;
var nextFire = 0;
var bulletTime = 0;
var Boss,pause_label;
var score = 0,textScore;
var interMu;
function create() {
    interMu.stop();
    interMu = game.add.audio('Play');
    interMu.loopFull();
    countRound = 0;
    game.add.sprite(0,0,'background');
    sprite2 = this.add.sprite(game.world.width/2,game.world.height*(3/5), 'collider');
    sprite2.anchor.set(0.5);
    sprite2.scale.setTo(0.20, 0.20);
    game.physics.arcade.enable(sprite2);
    sprite2.body.drag.set(70);
    sprite2.body.maxVelocity.set(300);
    sprite = this.add.sprite(game.world.width/2,game.world.height*(3/5), 'ship');
    sprite.anchor.set(0.5);
    sprite.scale.setTo(0.50, 0.50);
    game.physics.arcade.enable(sprite);
    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(300);
    score=0;
    textScore = game.add.text(20,20,"Score : "+score,{fontSize : "20px",fill : "#ed3465"});
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    destroyedCount=0;
	wave=-1;
    laserBeam1 = game.add.group();
    laserBeam1.enableBody = true;
    laserBeam1.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = laserBeam1.create(0, 0, 'laser');
        b.anchor.set(0.5);
        b.scale.setTo(3,1);
        b.name = 'laser' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    laserBeam2 = game.add.group();
    laserBeam2.enableBody = true;
    laserBeam2.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = laserBeam2.create(0, 0, 'laser');
        b.anchor.set(0.5);
        b.scale.setTo(3,1);
        b.name = 'laser' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    laserBeam3 = game.add.group();
    laserBeam3.enableBody = true;
    laserBeam3.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = laserBeam3.create(0, 0, 'laser');
        b.anchor.set(0.5);
        b.scale.setTo(3,1);
        b.name = 'laser' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bullets.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.scale.setTo(0.70,0.70);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = enemyBullets.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.scale.setTo(0.70,0.70);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets1 = game.add.group();
    bossBullets1.enableBody = true;
    bossBullets1.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets1.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.scale.setTo(0.70,0.70);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets2 = game.add.group();
    bossBullets2.enableBody = true;
    bossBullets2.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets2.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.scale.setTo(0.70,0.70);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets3 = game.add.group();
    bossBullets3.enableBody = true;
    bossBullets3.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets3.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.scale.setTo(0.70,0.70);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets4 = game.add.group();
    bossBullets4.enableBody = true;
    bossBullets4.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets4.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.anchor.set(0.5);
        b.scale.setTo(0.70,0.70);
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(BounceAndSplit, this);
    }
    bossBullets5 = game.add.group();
    bossBullets5.enableBody = true;
    bossBullets5.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets5.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.scale.setTo(0.70,0.70);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(BounceAndSplit2, this);
    }
    //pause_label = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    //pause_label.events.onInputUp.add(function () {game.paused = true;});
    sprite.body.collideWorldBounds = true;
    sprite2.body.collideWorldBounds = true;
    enemy = [];
    //game.pause_label.isDown.add(unpause, self);
    timer = game.time.create(false);
    timer.loop(3001, reposition, this);
    timer.start();
}
/*
function unpause(event){
	if(game.paused){
		if(fireButton.isDown){
			game.paused = false;
		}
	}
}*/
function update() {
	sprite2.x=sprite.x;
	sprite2.y=sprite.y;
	if(destroyedCount==0){
		wave++;
        plan = game.rnd.integerInRange(1, 10);
		console.log(plan);
        if(wave%7==0)
			summonWave(4);
		else if(wave%7==1)
			summonWave(5);
		else if(wave%7==2)
			summonWave(6);
        else if(wave%7==3)
      		summonWave(7);
        else if(wave%7==4)
        	summonWave(8);
        else if(wave%7==5)
        	summonWave(9);
    	else{	///boss
    		summonBoss();
        }
	}

    if (fireButton.isDown)
    {
        fire();
    }
    game.physics.arcade.overlap(sprite2,laserBeam1, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,laserBeam2, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,laserBeam3, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,enemyBullets, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets1, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets2, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets3, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets4, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets5, bulletHitPlayer, null , this);
    for (var i = 0; i < enemy.length; i++){
        if(wave%7!=6){
            game.physics.arcade.overlap(enemy[i].enemy_ship,bullets, bulletHitEnemy, null , this);
            game.physics.arcade.overlap(enemy[i].enemy_ship,sprite2, bulletHitPlayer, null , this);
        }
        else{
            console.log("PPP");
            game.physics.arcade.overlap(enemy[i].boss,bullets,bulletHitBoss,null,this);
            game.physics.arcade.overlap(enemy[i].boss,sprite2, bulletHitPlayer, null , this);

        }
        if(enemy[i].alive){
          enemy[i].update(i);
        }
    }
    sprite.body.velocity.y=0;
	  sprite.body.velocity.x=0;
  	if(cursors.up.isDown){
  		sprite.body.velocity.y = -300;
  	}
  	if(cursors.down.isDown){
  		sprite.body.velocity.y = 300;
  	}
  	if(cursors.left.isDown){
  		sprite.body.velocity.x = -300;
  	}
  	if(cursors.right.isDown){
  		sprite.body.velocity.x = 300;
  	}

  	if(this.input.keyboard.addKey(Phaser.KeyCode.ENTER).isDown){
  		game.paused = true;
  	}
  	window.onkeydown = function(event) {
    console.log("OK")
    if (game.input.keyboard.event.keyCode == 13){
		console.log("P");
        game.paused = false;
    }
}
}
EnemyShip = function (index, game, bullets) {
    var x = game.world.randomX;
    var y = 0;
    this.game = game;
    this.health = 3;
    this.bullets = bullets;
    this.alive = true;
    this.enemy_ship = game.add.sprite(x, y, 'enemy_ship');
    this.enemy_ship.anchor.set(0.5);
    this.enemy_ship.scale.setTo(0.75, 0.75);
    this.enemy_ship.name = index.toString();
    this.enemy_ship.count=0;
    this.enemy_ship.countBullet=0;
    game.physics.enable(this.enemy_ship);
    this.enemy_ship.body.immovable = false;
    this.enemy_ship.body.collideWorldBounds = true;
    this.enemy_ship.body.bounce.setTo(1, 1);
    this.enemy_ship.body.maxVelocity.set(200);
};

EnemyShip.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        score += 100;
        textScore.text = "Score : "+score;
        this.alive = false;
        this.enemy_ship.kill();
	    return true;
    }
    return false;

}
function reposition() {
    for (var i = 0; i < enemy.length; i++){
      randPositionX[i] = game.rnd.integerInRange(0, game.world.width);
      randPositionY[i] = game.rnd.integerInRange(0, (game.world.height*(3/5)));
    }
}
EnemyShip.prototype.update = function(i) {
    this.enemy_ship.body.velocity.y=0;
    this.enemy_ship.body.velocity.x=0;
    if(this.enemy_ship.x - randPositionX[i] <= 10){
        this.enemy_ship.body.velocity.x = 150;
    }else
    if(this.enemy_ship.x - randPositionX[i] >= 20){
        this.enemy_ship.body.velocity.x = -150;
    }
    if(this.enemy_ship.y - randPositionY[i] <= 10){
        this.enemy_ship.body.velocity.y = 150;
    }else
    if(this.enemy_ship.y - randPositionY[i] >= 20){
        this.enemy_ship.body.velocity.y = -150;
    }
    if(this.alive){
        fireBot(this.enemy_ship);
    }
}

function bulletHitPlayer (ship, bullet) {
    shot = game.add.audio('Death');
    shot.play();
    bullet.kill();
    ///
    game.state.start('postScore');
}

function bulletHitEnemy (enemy_ship, bullet) {
    if(enemy_ship.alive){
      bullet.kill();
      var destroyed = enemy[enemy_ship.name].damage();
      if(destroyed){
          ////play anime
          shot = game.add.audio('ENdestroy');
          shot.play();
          destroyedCount--;
      }
    }
}

function fire () {
	var vv = game.rnd.integerInRange(-75, 75);
    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x, sprite.y-10);
            bullet.body.velocity.x = vv;
            bullet.body.velocity.y = -900;
            bulletTime = game.time.now + 100;
        }
    }
}
var shot;
function fireBot (enemy_ship) {
    if(plan==1||plan==2){
        if(enemy_ship.count%60==0){

            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x, enemy_ship.y);
            bullet.body.velocity.y = 200;
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, 350);

        }
    }
    else if(plan==3||plan==4){

        console.log(">>");
        if(enemy_ship.count%30==0){
            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x, enemy_ship.y);
            if(enemy_ship.countBullet%5==0){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = 200;
            }
            else if(enemy_ship.countBullet%5==1){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = 100;
            }
            else if(enemy_ship.countBullet%5==2){
                bullet.body.velocity.y = 100;
            }
            else if(enemy_ship.countBullet%5==3){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = -100;
            }
            else if(enemy_ship.countBullet%5==4){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = -200;
            }
            enemy_ship.countBullet++;
        }
    }
    else{

        if(enemy_ship.count%50==0){
            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x, enemy_ship.y);
            bullet.body.velocity.y = 100;
        }
    }
    enemy_ship.count++;
}

function resetBullet (bullet) {
    bullet.kill();
}

function summonWave(numberWave){
    var l = enemy.length;
    for(var i=0;i<l;i++)
    	enemy.pop();
    destroyedCount=numberWave;
    for (var i = 0; i < numberWave; i++){
        enemy.push(new EnemyShip(i, game, enemyBullets));
    }
}


EnemyBoss = function (game) {
    var x = game.world.centerX;
    var y = 10;
    this.game = game;
    this.health = 500;
    this.countPlan=0;
    this.alive = true;
    this.boss = game.add.sprite(0,0,'boss');
    this.cannon1 = game.add.sprite((x*(1/4)), y, 'enemy_ship');
    this.cannon2 = game.add.sprite(x, y, 'enemy_ship');
    this.cannon3 = game.add.sprite((x*(7/4)), y, 'enemy_ship');
    this.cannon1.name = 1;
    this.cannon2.name = 2;
    this.cannon3.name = 3;
    //this.boss.anchor.set(0.5);
    this.boss.scale.setTo(0.5,0.15);
    this.cannon1.anchor.set(0.5);
    this.cannon2.anchor.set(0.5);
    this.cannon3.anchor.set(0.5);
    this.cannon1.count=0;
    this.cannon2.count=0;
    this.cannon3.count=0;
    this.cannon1.countBullet=0;
    this.cannon2.countBullet=0;
    this.cannon3.countBullet=0;
    game.physics.enable(this.boss);
    this.boss.body.immovable = false;
    this.boss.body.collideWorldBounds = true;
    this.boss.body.bounce.setTo(1, 1);
    this.boss.body.maxVelocity.set(200);
};

EnemyBoss.prototype.damage = function() {

    this.health -= 1;
    score += 100;
    textScore.text = "Score : "+score;
    if (this.health <= 0)
    {
        this.alive = false;
        this.boss.kill();
        this.cannon1.kill();
        this.cannon2.kill();
        this.cannon3.kill();
        return true;
    }
    return false;

}

EnemyBoss.prototype.update = function(){

    if(this.alive){
        fireBoss(this.cannon1,this.cannon2,this.cannon3,this.countPlan);
    }
    this.countPlan++;
}

function bulletHitBoss (boss, bullet) {
    console.log("???");
    if(boss.alive){
      bullet.kill();
      var destroyed = enemy[0].damage();
      if(destroyed){
          ////play anime
          shot = game.add.audio('BossDeath');
          shot.play();
          destroyedCount--;
      }
    }
}

//+60
function fireBoss(cannon1,cannon2,cannon3,countPlan){
    if(countPlan%3600<=300){//300
        if(countPlan%45==0){
            lockOn(cannon1,bossBullets1,400);
            lockOn(cannon2,bossBullets2,400);
            lockOn(cannon3,bossBullets3,400);
        }
    }
    else if(countPlan%3600>360&&countPlan%3600<=720){//360
        if(countPlan%10==0){
            superSplash(cannon1,bossBullets1);
            superSplash(cannon2,bossBullets2);
            superSplash(cannon3,bossBullets3);
        }
    }
    else if(countPlan%3600>800&&countPlan%3600<=1060){//180
        if(countPlan%6==0){
            laserOnTheMove(cannon1,laserBeam1);
            laserOnTheMove(cannon2,laserBeam2);
            laserOnTheMove(cannon3,laserBeam3);
        }
    }
    else if(countPlan%3600>1070+60&&countPlan%3600<=1250+60){//180
        if(countPlan%30==0){
            fireBounceAndSplit(cannon1,bossBullets4);
            fireBounceAndSplit(cannon2,bossBullets4);
            fireBounceAndSplit(cannon3,bossBullets4);
        }
    }
    else if(countPlan%3600>1340+60&&countPlan%3600<=1520+60){//180
        if(countPlan%30==0){
            fireWorks(cannon1,bossBullets4);
            fireWorks(cannon2,bossBullets4);
            fireWorks(cannon3,bossBullets4);
        }
    }
    else if(countPlan%3600>1660+60&&countPlan%3600<=1780+60){//120
        if(countPlan%30==0){
            lockOn(cannon1,bossBullets1,200);
        }
    }
    else if(countPlan%3600>1840+60&&countPlan%3600<=1960+60){//120
        if(countPlan%30==0){
            lockOn(cannon2,bossBullets2,200);
        }
    }
    else if(countPlan%3600>2060+60&&countPlan%3600<=2340){//120
        if(countPlan%30==0){
            lockOn(cannon2,bossBullets2,200);
        }
    }
    else if(countPlan%3600>2520&&countPlan%3600<=2640+60){//180
        if(countPlan==2521){
            p1=game.rnd.integerInRange(1,2);
        }
        if(countPlan%6==0){
            laserOnTheMove(cannon1,laserBeam1);
            if(p1==1)
                laserOnTheMove(cannon2,laserBeam2);
            else
                laserOnTheMove(cannon3,laserBeam3);
        }
    }
    else if(countPlan%3600>2750&&countPlan%3600<=3000+60){//180
        if(countPlan==2751){
            p1=game.rnd.integerInRange(1,2);
        }
        if(countPlan%6==0){
            laserOnTheMove(cannon2,laserBeam2);
            if(p1==1)
                laserOnTheMove(cannon1,laserBeam1);
            else
                laserOnTheMove(cannon3,laserBeam3);
        }
    }
    else if(countPlan%3600>3110&&countPlan%3600<=3360+30){//180
        if(countPlan==3111){
            p1=game.rnd.integerInRange(1,2);
        }
        if(countPlan%6==0){
            laserOnTheMove(cannon3,laserBeam3);
            if(p1==1)
                laserOnTheMove(cannon2,laserBeam2);
            else
                laserOnTheMove(cannon1,laserBeam1);
        }
    }

    countPlan++;
}

function lockOn (cannon,bullets,speed) {//30 400
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, speed);
}

function laserOnTheMove (cannon,bullets) { //40<7
    console.log(bullets.name);
    shot = game.add.audio('laser');
    shot.play();
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    bullet.body.velocity.y = 400;
    //bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, 200);
}

function superSplash (cannon,bullets) { //10
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    if(cannon.countBullet%9==0){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 200;
    }
    else if(cannon.countBullet%9==1){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 150;
    }
    else if(cannon.countBullet%9==2){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 100;
    }
    else if(cannon.countBullet%9==3){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 50;
    }
    else if(cannon.countBullet%9==4){
        bullet.body.velocity.y = 100;
    }
    else if(cannon.countBullet%9==5){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -50;
    }
    else if(cannon.countBullet%9==6){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -100;
    }
    else if(cannon.countBullet%9==7){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -150;
    }
    else if(cannon.countBullet%9==8){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -200;
    }
    cannon.countBullet++;
}
function fireBounceAndSplit(cannon,bullets){
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    bullet.body.velocity.y = 200;
}
function BounceAndSplit (bullet) {
    var x = bullet.x;
    var y = bullet.y;
    bullet.kill();
    var b1 = bossBullets1.getFirstExists(false);
    var b2 = bossBullets2.getFirstExists(false);
    var b3 = bossBullets3.getFirstExists(false);
    var b4 = enemyBullets.getFirstExists(false);
    b1.reset(x,y-10);
    b2.reset(x,y-10);
    b3.reset(x,y-10);
    b4.reset(x,y-10);
    b1.body.velocity.x = -200;
    b1.body.velocity.y = -100;

    b2.body.velocity.x = -100;
    b2.body.velocity.y = -100;

    b3.body.velocity.x = 100;
    b3.body.velocity.y = -100;

    b4.body.velocity.x = 200;
    b4.body.velocity.y = -100;
}
function BounceAndSplit2 (bullet) {
    var x = bullet.x;
    var y = bullet.y;
    bullet.kill();
    var b1 = bossBullets1.getFirstExists(false);
    var b2 = bossBullets2.getFirstExists(false);
    var b3 = bossBullets3.getFirstExists(false);
    var b4 = enemyBullets.getFirstExists(false);
    b1.reset(x,y+10);
    b2.reset(x,y+10);
    b3.reset(x,y+10);
    b4.reset(x,y+10);
    b1.body.velocity.x = -200;
    b1.body.velocity.y = 100;

    b2.body.velocity.x = -100;
    b2.body.velocity.y = 100;

    b3.body.velocity.x = 100;
    b3.body.velocity.y = 100;

    b4.body.velocity.x = 200;
    b4.body.velocity.y = 100;
}

function fireWorks (cannon,bullets) {
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x, cannon.y);
    bullet.body.velocity.y = 100;
    game.time.events.add(Phaser.Timer.SECOND * 3.3, boom,this,cannon);
}
function boom(cannon){
    console.log(".");
    var x = cannon.x;
    var y = game.world.height*(3/5);
    bullet.kill();
    var b1 = bossBullets1.getFirstExists(false);
    var b4 = bossBullets2.getFirstExists(false);
    var b3 = bossBullets3.getFirstExists(false);
    var b2 = enemyBullets.getFirstExists(false);
    var b5 = bossBullets5.getFirstExists(false);
    b1.reset(x,y);
    b2.reset(x,y);
    b3.reset(x,y);
    b4.reset(x,y);
    b5.reset(x,y);
    b1.body.velocity.x = -100;
    b1.body.velocity.y = -100;
    b2.body.velocity.x = 100;
    b2.body.velocity.y = -100;
    b3.body.velocity.x = 100;
    b3.body.velocity.y = 100;
    b4.body.velocity.x = -100;
    b4.body.velocity.y = 100;
    b5.body.velocity.y = -100;
}
function summonBoss(){
    var l = enemy.length;
    for(var i=0;i<l;i++)
        enemy.pop();
    destroyedCount=1;
    enemy.push(new EnemyBoss(game));
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var buttonStart,buttonHowToPlay;
var text;
function create1(){
    interMu = game.add.audio('intro');
    interMu.loopFull();
    buttonStart = game.add.button(game.world.centerX, game.world.centerY, 'start', toGame, this);
    buttonHowToPlay = game.add.button(game.world.centerX, game.world.centerY+100, 'howtoplay', toHowToPlay, this);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function create2(){
    interMu.stop();
    interMu = game.add.audio('intro');
    interMu.loopFull();
    text = game.add.text(game.world.centerX,game.world.centerY*(1/5),"How To Play",{fontSize : "20px",fill : "#ed3465"});
    text.anchor.set(0.5);
    buttonStart = game.add.button(game.world.centerX, game.world.centerY, 'start', toGame, this);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function create3(){
    interMu.stop();
    interMu = game.add.audio('Died');
    interMu.loopFull();
    text = game.add.text(game.world.centerX,game.world.centerY,"Score : "+score,{fontSize : "20px",fill : "#ed3465"});
    text.anchor.set(0.5);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function update1(){
    if(fireButton.isDown)
        game.state.start('main');
}
function toGame(){
    game.state.start('main');
}
function toHowToPlay(){
    game.state.start('htp');
}
