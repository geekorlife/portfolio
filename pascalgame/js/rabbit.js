var hi = {};
hi.initCanvas = function() {
    hi.canvasReady = !1;
    window.innerHeight > window.innerWidth ?(
                                            hi.canvasReady = !1,
                                            hi.canvas.style.display = "none",
                                            hi.clue1.style.display = "block",
                                            hi.clue1.style.left = (window.innerWidth - 320) / 2 + "px",
                                            hi.clue1.style.top = (window.innerHeight - 480) / 2 + "px"
                                            )
    : (window.innerHeight > window.innerWidth || window.innerWidth < 1.6 * window.innerHeight ? (480 < window.innerWidth ? (
                                                                                                                          hi.width = window.innerWidth,
                                                                                                                          hi.height = hi.width / 1.6
                                                                                                                          )
    : (hi.height = 300, hi.width = 480), hi.scale = hi.width / 480, hi.canvasWidth = hi.width, hi.canvasHeight = hi.height)
    : (320 <= window.innerHeight ? (hi.height = window.innerHeight, hi.width = 1.6 * hi.height, hi.canvasWidth = hi.width, hi.canvasHeight = hi.height)
        : (hi.height = window.innerHeight, hi.width = 1.6 * hi.height, hi.canvasHeight = 320, hi.canvasWidth = 480),
        hi.scale = hi.height / 300
    ),
    hi.width <<= 0, hi.height <<= 0,
    hi.canvas.width = hi.canvasWidth << 0,
    hi.canvas.height = hi.canvasHeight << 0,
    setTimeout(function() {window.scrollTo(0, 1)}, 100),
    hi.offset = null, hi.offset = {left: document.getElementById("canvas").offsetLeft,top: document.getElementById("canvas").offsetTop}, 
    hi.clue1.style.display = "none", hi.canvas.style.display = "", hi.canvasReady = !0)
};
hi.initMusic = function() {
    hi.music = {};
    hi.music.bg = document.getElementById("music_bg");
    hi.music.start = document.getElementById("music_start");
    hi.music.end = document.getElementById("music_end");
    hi.music.rocket = document.getElementById("music_rocket");
    hi.music.radish = document.getElementById("music_radish");
    hi.music.banana = document.getElementById("music_banana");
    hi.music.mushroom = document.getElementById("music_mushroom");
    hi.music.start.play();
    hi.music.bg.pause();
    hi.music.bg.addEventListener("ended", function() {
        hi.music.bg.currentTime = 0;
        hi.music.bg.play()
    }, !1)
};
function rSet() {
    var BoDy = document.getElementById("BoDy");
    BoDy.style.background = "#000000";
}

hi.reset = function() {
    hi.clue1 = null;
    hi.Can = null;
    hi.Can.style.background = null;
    hi.canvasBuf = null;
    hi.canvasBuf.width = null;
    hi.canvasBuf.height = null;
    hi.ctx = null;
    hi.canvas = null;
    hi.context = null;
    hi.imgs = null;
    hi.btns = null;
    hi.ready = null;
    hi.timer = null;
    hi.index = null;
    hi.newGame = null;
    hi.alpha1 = null;
    hi.alpha2 = null;
    hi.beta1 = null;
    hi.beta2 = null;
    hi.gamma1 = null;
    hi.gamma2 = null;
    hi.init();
};

hi.init = function() {
    hi.clue1 = document.getElementById("clue1");
    hi.Can = document.getElementById("BoDy");
    hi.Can.style.background = 'url("../img/logo.jpg") no-repeat center, #000000';
    hi.canvasBuf = document.getElementById("buffer");
    hi.canvasBuf.width = 480;
    hi.canvasBuf.height = 300;
    hi.ctx = hi.canvasBuf.getContext("2d");
    hi.canvas = document.getElementById("canvas");
    hi.context = hi.canvas.getContext("2d");
    hi.initCanvas();
    setTimeout(function() {hi.initCanvas()}, 1E3);
    hi.imgs = {};
    hi.btns = {};
    hi.initImgs(game.imgResource);
    hi.initEvent();
    hi.ready = !1;
    hi.timer = 0;
    hi.index = 0;
    hi.newGame = !0;
    gameAPI.gameStart(game.init());
    gameAPI.sendInfo({starTinG : 'starTinG'});
    hi.initMusic();
    hi.alpha1 = 0;
    hi.alpha2 = 0;
    hi.beta1 = 0;
    hi.beta2 = 0;
    hi.gamma1 = 0;
    hi.gamma2 = 0;
    setTimeout (function() {animate(), rSet()},4000);
};

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


var fps = 30; //frames per second
var lastExecution = new Date().getTime();
function animate(){
    var now = new Date().getTime();
    if ((now - lastExecution) > (1000 / fps)){
        //do actual drawing
        hi.canvasReady && (hi.update(), hi.draw());
        lastExecution = new Date().getTime();
    }
    requestAnimationFrame(animate);
};

hi.initImgs = function(a) {
    for (var c = a.length, d = 0; d < c; d++) {
        var b = a[d].img;
        hi.imgs[b] = new Image;
        hi.imgs[b].src = a[d].src
    }
};
hi.checkMusic = function() {
    switch (game.page) {
        case "logo":
            hi.music.bg.pause();
            hi.music.start.play();
            break;
        case "tool":
            hi.music.bg.pause();
            hi.music.start.play();
            break;
        case "game":
            hi.music.start.pause();
            hi.music.end.pause();
            hi.music.bg.play();
            break;
        case "score":
            hi.music.bg.pause(), hi.music.end.play()
    }
};
hi.initEvent = function() {
    hi.canvas.onmousedown = function(a) {
        hi.touchStart(a)
    };
    hi.canvas.ontouchstart = function(a) {
        hi.touchStart(a);
        hi.checkMusic()
    };
    window.onresize = function() {
        hi.initCanvas()
    };
    window.onorientationchange = function() {
        hi.initCanvas()
    }
};
hi.drawNum = function(a, c, d, b, e, f) {
    if (0 >= a)
        hi.ctx.drawImage(b, 0, 0, e, f, c, d, e, f);
    else {
        for (var g = a / 10 << 0, h = 0, a = a % 10, i = []; g || a; )
            i[h++] = a, a = g % 10, g = g / 10 << 0;
        a = i.reverse();
        g = a.length;
        for (h = 0; h < g; h++)
            hi.ctx.drawImage(b, e * a[h], 0, e, f, c + e * h, d, e, f)
    }
};
hi.addBtn = function(a) {
    hi.btns[a.id] = a;
    hi.btns[a.id].pressed = !1
};
hi.touchStart = function(a) {
    if (hi.canvasReady) {
        a.preventDefault();
        var c;
        a.touches ? (c = a.touches[0].clientX - hi.offset.left, a = a.touches[0].clientY - hi.offset.top) : (c = a.clientX - hi.offset.left, a = a.clientY - hi.offset.top);
        c /= hi.scale;
        a /= hi.scale;
        switch (game.page) {
            case "game":
                game.play.jump1();
                break;
            default:
                for (var d in hi.btns) {
                    var b = hi.btns[d];
                    if (b.page === game.page && c > b.x && c < b.x + b.w && a > b.y && a < b.y + b.h) {
                        b.click();
                        break
                    }
                }
        }
    }
};
hi.touchEnd = function(a) {
    if (hi.canvasReady) {
        a.preventDefault();
        var c;
        a.touches ? (c = a.touches[0].clientX - hi.offset.left, a = a.touches[0].clientY - hi.offset.top) : (c = a.clientX - hi.offset.left, a = a.clientY - hi.offset.top);
        c /= hi.scale;
        a /= hi.scale;
        switch (game.page) {
            case "game":
                break;
            default:
                for (var d in hi.btns) {
                    var b = hi.btns[d];
                    if (b.page === game.page && b.pressed && c > b.x && c < b.x + b.w && a > b.y && a < b.y + b.h) {
                        b.click();
                        break
                    }
                }
        }
        for (b in hi.btns)
            hi.btns[b].pressed = !1
    }
};
window.addEventListener && (-1 != navigator.userAgent.toLowerCase().indexOf("iphone") || -1 != navigator.userAgent.toLowerCase().indexOf("ipod") ?
                            window.addEventListener("devicemotion", function(a) {
                                if (hi.canvasReady) {
                                    if (a.rotationRate && game.play.rabbit.ready) {
                                        hi.alpha1 = a.rotationRate.alpha;
                                        hi.beta1 = a.rotationRate.beta;
                                        hi.gamma1 = a.rotationRate.gamma;
                                        var c = hi.alpha1 - hi.alpha2, d = hi.gamma1 - hi.gamma2;
                                        120 < hi.beta1 - hi.beta2 ? game.play.jump2() : 70 < c && game.play.jump1();
                                        hi.alpha2 = hi.alpha1;
                                        hi.beta2 = hi.beta1;
                                        hi.gamma2 = 
                                        hi.gamma1;
                                        hi.alpha = c;
                                        hi.gamma = d
                                    }
                                    a.preventDefault();
                                    return !1
                                }
                            }, !1)
                            : window.addEventListener("deviceorientation", function(a) {
                                if (hi.canvasReady) {
                                    if (a.alpha && game.play.rabbit.ready) {
                                        hi.alpha1 = a.alpha;
                                        hi.beta1 = a.beta;
                                        hi.gamma1 = a.gamma;
                                        var c = Math.abs(hi.alpha1 - hi.alpha2);
                                        Math.abs(hi.beta1 - hi.beta2);
                                        var d = Math.abs(hi.gamma1 - hi.gamma2);
                                        7 < c ? game.play.jump1() : 45 < d && game.play.jump2();
                                        hi.alpha2 = hi.alpha1;
                                        hi.beta2 = hi.beta1;
                                        hi.gamma2 = hi.gamma1
                                    }
                                    a.preventDefault();
                                    return !1
                                }
                            }, !1)
    );
hi.update = function() {
    game.update()
};
hi.draw = function() {
    game.draw()
};
var game = {
    imgResource: [
                  {img: "logo",src: "img/logo.jpg"},
                  {img: "cadre",src: "img/cadre.png"},
                  {img: "shadow",src: "img/shadow.png"},
                  {img: "player",src: "img/player.png"},
                  {img: "player2",src: "img/player2.png"},
                  {img: "white",src: "img/white.png"},
                  {img: "white1",src: "img/white1.png"},
                  {img: "rocket",src: "img/rocket.png"},
                  {img: "bananaSkin",src: "img/banana_skin.png"},
                  {img: "rabbit",src: "img/rabbit.png"},
                  {img: "rabbitRocket",src: "img/rabbit_rocket.png"},
                  {img: "rabbitSlide",src: "img/rabbit_slide.png"},
                  {img: "badMushroom",src: "img/bad_mushroom.png"},
                  {img: "radish",src: "img/radish.png"},
                  {img: "startgame",src: "img/start.png"},
                  {img: "intro",src: "img/props_that.jpg"},
                  {img: "bg1",src: "img/bg1.jpg"},
                  {img: "bg2",src: "img/bg2.png"},
                  {img: "btnNext",src: "img/next.png"},
                  {img: "btnReset",src: "img/reset.png"},
                  {img: "btnExit",src: "img/exit.png"},
                  {img: "socrebg",src: "img/score_bg.jpg"},
                  {img: "WinneR",src: "img/winner.jpg"},
                  {img: "LoseR",src: "img/loser.jpg"},
                  {img: "star",src: "img/star.png"},
                  {img: "num",src: "img/number.png"},
                  {img: "gameShow",src: "img/game_show.png"}
                  ]
};
game.init = function() {
    game.width = hi.width;
    game.height = hi.height;
    game.rocketCount = 0;
    game.bananaSkinCount = 0;
    game.radishCount = 0;
    game.badMushroomCount = 0;
    game.scoreCount = 100;
    game.numWidth = 20;
    game.timeCount = 0;
    game.timer = null;
    game.page = "logo";
    logoIntro.init()
};
game.update = function() {
    switch (game.page) {
        case "logo":
            logoIntro.logoUpdate();
            break;
        case "tool":
            logoIntro.toolUpdate();
            break;
        case "game":
            game.play.update();
            break;
        case "score":
            game.score.update()
    }
    hi.checkMusic()
};
game.draw = function() {
    window.scrollTo(0, 1);
    switch (game.page) {
        case "logo":
            logoIntro.logoDraw();
            break;
        case "tool":
            logoIntro.toolDraw();
            break;
        case "game":
            game.play.draw();
            break;
        case "score":
            game.score.draw();
    }
    hi.context.drawImage(hi.canvasBuf, (hi.canvasWidth - hi.width) / 2, 0, hi.width, hi.height)
};
game.randomTools = {
    init: function() {
        this.COUNT = 4;
        this.type = ["rocket", "radish", "bananaSkin", "badMushroom"];
        this.randFre = [this.COUNT, 2.5 * this.COUNT, 0.75 * this.COUNT, this.COUNT / 2];
        this.recentUser = [];
        this.lruConut = 1;
        this.level = {rocket: [2, 3],radish: [2, 3, 1, 1],bananaSkin: [1],badMushroom: [1]}
    },
    next: function() {
        if (this.isEmpty())
            this.randFre = [this.COUNT, 2.5 * this.COUNT, 0.75 * this.COUNT, this.COUNT / 2];
        var a = this.genLRU_LFU(), a = a[this.getRandomInt(a.length)], c = this.randomLevel(a);
        this.randFre[a] -= 1;
        this.recentUser.push(a);
        this.recentUser.length > this.lruConut && this.recentUser.shift();
        return {type: this.type[a],level: c}
    },
    genLRU_LFU: function() {
        for (var a = [], c = this.randFre[0], d = this.randFre.length, b = 0; b < d; b++)
            this.randFre[b] > c && (c = this.randFre[b]);
        for (b = 0; b < d; b++)
            c === this.randFre[b] && this.hasRemainder(b) && a.push(b);
        c = this.recentUser.length;
        for (b = d; 0 < b; b--) {
            for (var d = !1, e = 0; e < c; e++)
                if (this.recentUser[e] === b - 1) {
                    d = !0;
                    break
                }
            !d && this.hasRemainder(b - 1) && a.push(b - 1)
        }
        return a
    },
    hasRemainder: function(a) {
        return 0 < this.randFre[a] ? !0 : !1
    },
    randomLevel: function(a) {
        a = this.level[this.type[a]];
        return a[this.getRandomInt(a.length)]
    },
    isEmpty: function() {
        for (var a = 0, c = 0; c < this.randFre.length; c++)
            a += this.randFre[c];
        return 0 >= a ? !0 : !1
    },
    getRandomInt: function(a) {
        return Math.floor(a * Math.random())
    }};

function starGam() {
    var gameRead = document.getElementById('gameRead');
    if (opRead === 1) {
        gameRead.style.visibility="hidden";
        game.score.startCountTime();
        game.page = "game";
        game.play.init();
        hi.music.start.pause();
        hi.music.bg.play()
    }
    else {
        setTimeout (function() {starGam()},20);
    }
}

var logoIntro = {
    init: function() {
        game.logo = {};
        game.tool = {};
        game.logo.logoTimer = 0;
        game.logo.btnLogo = {id: "btnLogo",img: hi.imgs.logo,x: 0,y: 0,w: 480,h: 300,page: "logo"};
        game.logo.btnLogo.click = function() {
            game.page = "tool"
        };
        
        game.tool.btnStartGame = {id: "btnStartGame",img: hi.imgs.startgame,x: 137,y: 200,w: 208,h: 110,page: "tool"};
                
        //adversaire pret ou pas ?
        game.tool.btnStartGame.click = function() {
            gameAPI.sendInfo({opReady : 'ok'});
            var gameRead = document.getElementById('gameRead');
            if (opRead === 1) {
                gameRead.style.visibility="hidden";
                game.score.startCountTime();
                game.page = "game";
                game.play.init();
                hi.music.start.pause();
                hi.music.bg.play()
            }
            else {
                gameRead.style.visibility="visible";
                starGam()
            }
        };
        hi.addBtn(game.logo.btnLogo);
        hi.addBtn(game.tool.btnStartGame)
  
    },
    //ici on attend l'adversaire
    logoUpdate: function() {
        if (0 != game.logo.logoTimer && 3E3 < (new Date).getTime() - game.logo.logoTimer)
            game.logo.logoTimer = 0, game.page = "tool"
    },
    toolUpdate: function() {
    },
    logoDraw: function() {
        if (0 === game.logo.logoTimer)
            hi.ctx.drawImage(hi.imgs.bg1, 0, 0),
            hi.ctx.drawImage(hi.imgs.bg2, 0, 161),
            hi.ctx.drawImage(game.logo.btnLogo.img, game.logo.btnLogo.x, game.logo.btnLogo.y),
            game.logo.logoTimer = (new Date).getTime()
    },
    toolDraw: function() {
        var gameInfo1 = document.getElementById('gameInfo1');
        var gameInfo2 = document.getElementById('gameInfo2');
	gameInfo1.style.visibility="visible";
        hi.ctx.clearRect(0, 0, game.width, game.height);
        hi.ctx.drawImage(hi.imgs.intro, 0, 0);
        if (startingGame === 1) {
             gameAPI.sendInfo({starTinG : 'starTinG'});
             gameInfo1.style.visibility="hidden";
             gameInfo2.style.visibility="visible";
            hi.ctx.drawImage(game.tool.btnStartGame.img, game.tool.btnStartGame.x, game.tool.btnStartGame.y)
        };
    }
};
game.play = {};
game.play.init = function() {
    var gameInfo2 = document.getElementById('gameInfo2');
    gameInfo2.style.visibility="hidden";
    game.play.dis = 2E4;
    game.play.distance = 20000;
    game.play.s = 0;
    game.play.distbeg = 0;
    game.play.v = 10;
    game.play.h = 0;
    game.play.dx1 = 0;
    game.play.dx2 = 0;
    game.play.timer = 0;
    game.play.BuffAnimation = [{t: 0,buff: 0}, {t: 0,buff: 0}, {t: 0,buff: 0}, {t: 0,buff: 0}, {t: 0,buff: 0}];
    game.play.rabbit = null;
    game.play.rabbit = {
                        index: 0,
                        x: 50,
                        y: 170,
                        width: 80,
                        height: 90,
                        img: hi.imgs.rabbit,
                        ready: !0,
                        jumping: !1,
                        layer: 0,
                        h: 0,
                        v0: -20,
                        v: 0,
                        a: 2,
                        t: 0,
                        doubleJump: !1,
                        init: function() {
                            this.ready = !0;
                            this.jumping = !1;
                            this.t = this.v = this.h = this.layer = 0;
                            this.doubleJump = !1
                        }
                        };
    game.play.foods = null;
    game.play.foods = [];
    game.randomTools.init();
    game.play.addFoods(10)
};
//ajout des obstacles
game.play.addFoods = function(a) {
    for (var c = 0; c < a; c++) {
        var d = game.play.foods.length, b = 0, b = 0 === d ? game.play.s + 300 : game.play.foods[d - 1].s, e = game.randomTools.next();
        switch (e.type) {
            case "rocket":
                game.play.foods[d] = {type: "rocket",s: b + 350 + 150 * Math.random(),w: 60,h: 47,img: hi.imgs.rocket,index: 0,v: 10,score: 0,level: e.level};
                break;
            case "radish":
                game.play.foods[d] = {type: "radish",s: b + 350 + 150 * Math.random(),w: 50,h: 50,img: hi.imgs.radish,index: 0,v: 0,score: "Great",level: e.level};                
                break;
            case "bananaSkin":
                game.play.foods[d] = {type: "bananaSkin",
                    s: b + 350 + 150 * Math.random(),w: 45,h: 40,img: hi.imgs.bananaSkin,index: 0,v: -5,score: 0,level: e.level};
                break;
            case "badMushroom":
                game.play.foods[d] = {type: "badMushroom",s: b + 350 + 150 * Math.random(),w: 30,h: 30,img: hi.imgs.badMushroom,index: 0,v: 0,score: "Oupss",level: e.level}
        }
    }
};
game.play.jump1 = function() {
    var a = game.play.rabbit;
    if (a.ready && 10 <= game.play.v)
        a.index = 0, a.t = 0, a.v = 0, a.layer = a.h, game.play.rabbit.jumping = !0, game.play.rabbit.ready = !1
};
game.play.jump2 = function() {
    var a = game.play.rabbit;
    if (a.ready && !a.jumping && 10 <= game.play.v)
        a.index = 0, a.doubleJump = !0, game.play.rabbit.jumping = !0, game.play.rabbit.ready = !1
};
game.play.updateAndDrawBuff = function() {
    for (var a = game.play.rabbit, c = game.play.BuffAnimation.length, d = 0; d < c; d++) {
        var b = game.play.BuffAnimation[d];
        if (0 < b.t) {
            b.t--;
            var e = "";
            hi.ctx.fillStyle = "rgba(255, 0, 0, " + b.t / 30 + ")", e = b.buff;
            hi.ctx.font = "30px sans";
            hi.ctx.fillText(e, a.x + 30, a.y + 5 * b.t + a.h - 100)
        }
    }
    game.play.BuffAnimation.sort(function(a, b) {
        return b.t - a.t
    })
};
var adv=0;
game.play.update = function() {
    if (addBan === 1) {
        game.play.v = 2;
        slowMsg = 1;
        setTimeout(function() {game.play.v = 10},700)                    
    };
    var el = document.getElementById('eXit');
    game.play.s += game.play.v;
    if (game.play.s > game.play.dis || game.play.distbeg > game.play.distance) {
        gameAPI.sendFinalStatus("win");
        //setTimeout(function(){reToure}, 1500);
        game.page = "score";
        gameAPI.sendInfo({gameOutcome : 'win'});
        Winner = 1;
        game.score.init();
        hi.music.bg.pause();
        hi.music.end.play();        
	el.style.visibility="visible";
	el.style.position="absolute";
	el.style.top=hi.height - 66+"px";
	el.style.left="50%";
	el.style.marginLeft="-75px";
	el.addEventListener("click", reToure, false);
        setTimeout(function(){
		gameAPI.endGame()
	}, 15000);
    }
    else if (gameFin === 1) {
        //gameAPI.sendFinalStatus("lose");
        //setTimeout(function(){reToure}, 1500);
        game.page = "score";
        Winner = 0;
        game.score.init();
        hi.music.bg.pause();
        hi.music.end.play();
	el.style.visibility="visible";
	el.style.position="absolute";
	el.style.top=hi.height - 66+"px";
	el.style.left="50%";
	el.style.marginLeft="-75px";
	el.addEventListener("click", reToure, false);
        setTimeout(function(){
		gameAPI.endGame()
        }, 15000);
    }
    else {
        game.play.dx1 += game.play.v / 10;
        game.play.dx1 = 960 <= game.play.dx1 ? 0 : game.play.dx1;
        game.play.dx1 = game.play.dx1 + 0.5 << 0;
        game.play.dx2 += game.play.v;
        game.play.dx2 = 960 <= game.play.dx2 ? 0 : game.play.dx2;
        game.play.dx2 = game.play.dx2 + 0.5 << 0;
        
        var a = game.play.rabbit;
        if (a.jumping) {
            a.t++;
            a.v = a.v0 + a.a * a.t;
            if (2 > Math.abs(a.v) && 0 > a.h && 0 === a.layer)
                a.ready = !0, a.doubleJump && 
                game.play.jump1();
            a.h = a.layer + a.v0 * a.t + a.a * a.t * a.t / 2;
            if (0 < a.h)
                a.h = 0 < a.h ? 0 : a.h, a.init()
        }
        if (10 < game.play.v) {
                    a.img = hi.imgs.rabbitRocket, a.index = (a.index + 1) % 5;
                    game.play.distbeg +=50;
                    gameAPI.sendInfo({opRock : 'rocket'});
        }
        
        else if (10 > game.play.v) {
                    game.play.distbeg +=1;
                    a.img = hi.imgs.rabbitSlide, a.index = (a.index + 1) % 5;
                    gameAPI.sendInfo({opslide : 'slide'});
        }
        else {
            a.img = hi.imgs.rabbit;
                    game.play.distbeg +=10;
                    gameAPI.sendInfo({opok : 'ok'});
            if (a.jumping && 3 < Math.abs(a.h))
                a.index = 7 < a.index ? 7 : a.index;
                if (adv==0) {
                    adv++;
                } else {
                    adv=0;
                    a.index = (a.index + 1) % 10
                }
            
        }
        for (var c = game.play.foods.length, d = 0; d < c; d++) {
            var b = game.play.foods[d], e = game.play.rabbit.x + b.s - game.play.s, f = game.play.getFoodPosY(b.level);
            if (-50 > e) {
                game.play.foods.shift();
                game.play.addFoods(1);
                break
            } else if (a.x + a.width > e && a.x < e + b.w && a.y + a.h + a.layer + a.height > f && a.y + a.h + a.layer < f + b.h) {
                switch (b.type) {
                    case "rocket":
                        game.rocketCount++;
                        hi.music.rocket.play();
                        break;
                    case "radish":
                        game.radishCount++;
                        gameAPI.sendInfo({addBan : 'addBan'});
                        hi.music.radish.play();
                        break;
                    case "bananaSkin":
                        game.bananaSkinCount++;
                        hi.music.banana.play();
                        break;
                    case "badMushroom":
                        wHIte = 1;
                        game.badMushroomCount++, hi.music.mushroom.play()
                }
                if (0 > b.v)
                    game.play.v = 5, game.play.timer = 50, a.index = 0;
                else if (0 < b.v)
                    game.play.v = 20, game.play.timer = 80, a.index = 0;
                game.scoreCount += b.score;
                if (0 != b.score) {
                    c = game.play.BuffAnimation.length;
                    for (d = 0; d < c; d++)
                        if (0 === game.play.BuffAnimation[d].t) {
                            game.play.BuffAnimation[d].t = 30;
                            game.play.BuffAnimation[d].buff = b.score;
                            break
                        }
                }
                game.play.foods.splice(d, 1);
                game.play.addFoods(1);
                break
            }
        }

        //console.log (distop);

        if (0 < game.play.timer && (game.play.timer--, 0 === game.play.timer))
            game.play.v = 10
    }
};
var slowMsg = 0,
    xX = 11,
    yY = 11,
    sX = 1;
game.play.draw = function() {
    480 >= game.play.dx1 ? hi.ctx.drawImage(hi.imgs.bg1, game.play.dx1, 0, 480, 300, 0, 0, 480, 300) :
                           (
                            hi.ctx.drawImage(hi.imgs.bg1, game.play.dx1, 0, 960 - game.play.dx1, 300, 0, 0, 960 - game.play.dx1, 300),
                            hi.ctx.drawImage(hi.imgs.bg1, 0, 0, game.play.dx1 - 480, 300, 960 - game.play.dx1, 0, game.play.dx1 - 480, 300)
                            );
    480 >= game.play.dx2 ? hi.ctx.drawImage(hi.imgs.bg2, game.play.dx2, 0, 480, 139, 0, 161, 480, 139) :
                                           (
                                            hi.ctx.drawImage(hi.imgs.bg2, game.play.dx2, 0, 960 - game.play.dx2, 139, 0, 161, 960 - game.play.dx2, 139),
                                            hi.ctx.drawImage(hi.imgs.bg2, 0, 0, game.play.dx2 - 480, 139, 960 - game.play.dx2, 161, game.play.dx2 - 480, 139)
                                            );

    
    hi.ctx.drawImage(hi.imgs.gameShow, 0, 5);
    //msg de ralentit
    var imgSl = new Image();
    imgSl.src = 'img/slow.png';
    if (slowMsg === 1) {
        hi.ctx.drawImage(imgSl,34,122);
        setTimeout(function() {slowMsg = 0}, 500)
    };  

    //hi.drawNum(game.timeCount, 60, 5, hi.imgs.num, 20, 26);
    //hi.ctx.drawImage(hi.imgs.num, 242, 2, 17, 24, 60 + game.score.getNumberW(game.timeCount), 10, 17, 24);
    //hi.drawNum(game.scoreCount, 200, 5, hi.imgs.num, 20, 26);
    var a = game.play.rabbit;
    hi.ctx.drawImage(a.img, 100 * a.index, 0, 100, 100, a.x, a.y + a.h, 100, 100);
    for (var a = game.play.foods.length, c = 0; c < a; c++) {
        var d = game.play.foods[c], b = game.play.getFoodPosY(d.level), e = game.play.rabbit.x + 
        d.s - game.play.s;
        if (480 < e)
            break;
        else
            hi.ctx.drawImage(d.img, e, b)
    }
    game.play.updateAndDrawBuff();
    

    
    
    //shadow
    hi.ctx.drawImage(hi.imgs.shadow, 0, 0);
    
    //white screen
    if (wHIte === 1) {
        if (xX <= 1 || yY <= 1) {
            xX = 1;
            yY = 1;
            var mX = 0;
            var mY = 0;
            hi.ctx.drawImage(hi.imgs.white1,mX,mY, 480 / xX, 300 / yY);
        }
        else {
            xX = xX - 3;
            yY = yY - 3;
            var mX = (480/2) - ((480 / xX) /2);
            var mY = 300 - ((300 / yY) /2);
            var gX = 480 / xX;
            var gY = 300 / yY;
            if (gX < 0) {
                gX = 480;
            }
            if (gY < 0) {
                gY = 300;
            }
            hi.ctx.drawImage(hi.imgs.white,mX,mY, gX, gY);
        }
        
        setTimeout(function() {wHIte = 0; xX = 11; yY = 11}, 1200);
    };
    hi.ctx.drawImage(hi.imgs.cadre,0,0);
    //rectangle niv adversaire et joueur
    hi.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    hi.ctx.fillRect(10, 10, game.play.distbeg * 0.0225, 10); 
    hi.ctx.fillRect(10, 30, distop * 0.0225, 10);
    hi.ctx.drawImage(hi.imgs.player,game.play.distbeg * 0.0225 - 10, 6);
    hi.ctx.drawImage(hi.imgs.player2,distop * 0.0225 - 10, 26);    
};
game.play.getFoodPosY = function(a) {
    switch (a) {
        case 1:
            return 230;
        case 2:
            return 115;
        case 3:
            return 20
    }
};
game.score = {};
game.score.init = function() {
    game.score.offsetX = -hi.width;
    game.score.offsetT = 0;
    game.score.btnNext = {id: "btnNext",img: hi.imgs.btnNext,x: 100,y: 225,w: 70,h: 70,page: "score"};
    game.score.btnNext.click = function() {
        game.page = "game";
        game.play.init();
        game.score.startCountTime();
        hi.music.end.pause();
        hi.music.bg.play()
    };
    hi.addBtn(game.score.btnNext);
    game.score.btnReset = {id: "btnReset",img: hi.imgs.btnReset,x: 215,y: 225,w: 70,h: 70,page: "score"};
    game.score.btnReset.click = function() {
        game.page = "game";
        game.play.init();
        game.score.startCountTime();
        game.scoreCount = 100;
        hi.music.end.pause();
        hi.music.bg.play()
    };
    hi.addBtn(game.score.btnReset);
    game.score.btnExit = {id: "btnExit",img: hi.imgs.btnExit,x: 312,y: 225,w: 70,h: 70,page: "score"};
    game.score.btnExit.click = function() {
        hi.music.end.pause();
        1 < history.length ? history.back() : window.close()
    };
    hi.addBtn(game.score.btnExit);
    clearInterval(game.timer)
};
game.score.update = function() {
    game.score.offsetT++;
    game.score.offsetX = 10 <= game.score.offsetT ? 0 : game.score.offsetX + -game.score.offsetX / (10 - game.score.offsetT)
};
game.score.startCountTime = function() {
    game.timer && clearInterval(game.timer);
    game.timeCount = 0;
    game.timer = setInterval(function() {
        game.timeCount++
    }, 1E3)
};

/* ecran de fin */
game.score.draw = function() {
    console.log('score draw');
    hi.ctx.clearRect(0, 0, game.width, game.height);
    if (Winner === 1) {
        hi.ctx.drawImage(hi.imgs.WinneR, 0 + game.score.offsetX, 0);
    }
    if (Winner === 0) {
        hi.ctx.drawImage(hi.imgs.LoseR, 0 + game.score.offsetX, 0);
    }
//    if (Winner === 1) {
//        var Ywin = document.getElementById('Ywin');
//	Ywin.style.visibility="visible";
//    }
//    else if (Winner === 0){
//        var Ylose = document.getElementById('Ylose');
//	Ylose.style.visibility="visible";
//    }
/*    hi.drawNum(game.rocketCount, 85 + game.score.offsetX, 77, hi.imgs.num, 20, 26);
    hi.drawNum(game.bananaSkinCount, 210 + game.score.offsetX, 77, hi.imgs.num, 20, 26);
    hi.drawNum(game.radishCount, 310 + game.score.offsetX, 77, hi.imgs.num, 20, 26);
    hi.drawNum(game.badMushroomCount, 425 + game.score.offsetX, 77, hi.imgs.num, 20, 26)*/;
    var a = game.score.calScore();
};
/* fin de l'ecran de fin */

game.score.getNumberW = function(a) {
    return 0 === a ? void 0 : game.numWidth * a.toString().length
};
game.score.drawStar = function(a) {
    var c = 1;
    7E4 <= a ? c = 4 : 4E4 <= a && 7E4 > a ? c = 3 : 2E4 <= a && 4E4 > a && (c = 2);
    for (var a = [0, 3, 7, 9], d = 1; d <= c; d++)
        hi.ctx.drawImage(hi.imgs.star, 53 * (d - 1) - a[d - 1] + 145 + game.score.offsetX, 172)
};
game.score.calScore = function() {
    var a = 100 * (250 - game.timeCount + game.scoreCount);
    return 0 > a ? 0 : a
};

//API GAMORLIVE
/*On récupère le pseudo de l'adversaire*/
var displayPlayerName = function (data){
        that = this;
	console.log(data);
	scorAff = true;
	$('#gameInfo').html('');
	$('#opponent').html(data);//on envoie le pseudo dans la span opponent
	$('#opponent1').html(data);
	name = data;
	waitingOp = true;
	loaDing = false;
	return name;

};
/*On met le score de l'adversaire a zero*/
var distop = 0;
var gameFin = 0;
var startingGame = 0;
var Winner;
var opRead;
var addBan = 0;
var wHIte = 0;
function getResponse(data){
	     if (opRock = data['opRock']) {
		distop += 50;
	     };
             if (opReady = data['opReady']) {
		opRead = 1;
	     };
             if (addBan = data['addBan']) {
		addBan = 1;
	     };             
	     if (opok = data['opok']) {
		distop += 10;
	     };
             if (opslide = data['opslide']) {
		distop += 1;
	     };
	    if (data['gameOutcome'] === "lose" || data['gameOutcome'] === "win") {
		if (data['gameOutcome'] === "lose") {
			Winner = 1;
                        endGame = true;
                        gameAPI.sendInfo({gameOutcome : 'win'});
			gameAPI.sendFinalStatus("win"); 
			setTimeout("gameAPI.endGame();", 15000);                        
		} else {
			Winner = 0;
                        gameFin = 1;
			endGame = true;
                        //gameAPI.sendInfo({gameOutcome : 'lose'});
			gameAPI.sendFinalStatus("lose");
			setTimeout("gameAPI.endGame();", 15000);
		}
	    };
            if (starTinG = data['starTinG']) {
		startingGame = 1;
	     };
            
};
function reToure(){
        setTimeout("gameAPI.endGame();", 10);
};



