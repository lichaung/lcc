var scorenext=0;
function Basketball() {
    this.version = "0.1", this.balls = [], this.hoops = [], this.texts = [], this.res = {},this.score = 0, 
	this.started = !1, //false
	this.gameOver = !1, //false
	this.ballX = 160, //球X坐标
	this.ballY = 880, //球Y坐标
	this.ballVel = 1200, this.ballAngleVel = 10, this.ballAngle = 0, 
	this.ballsShot = 1, this.ballCharge = 0, this.time = 30, 
	this.toNextSecond = 1, this.sound = !1, //false
	this.state = "menu", 
	this.menuText = new AnimatedText("点击开始游戏", 320, 530, 40, .01), 
	this.overText = new AnimatedText("点击继续游戏", 320, 800, 40, .01), 
	this.flashText = [], 
	this.scored = 0, 
	this.totalBalls = 3, 
	this.round = 1, 
	this.missed = 0, 
	//this.timer = 30,
	timerself=30,
	this.displayScore = 0, 
	this.storage = "undefined" != typeof Storage ? !0 : !1;//true or false
    var t;
	var w,h;
	w =  (window.innerWidth || document.documentElement.clientWidth) || document.body.clientWidth;
	h = (window.innerHeight || document.documentElement.clientHeight) || document.body.clientHeight;
    this.init = function() {
        return this.setupCanvas(), this.load(), this.setupEventListeners(), this.resizeToWindow(),this.counttip(), this//;
    }, 
	this.counttip = function(t){
		//Basketball.drawText(t, "点击屏幕投球. 投丢3次游戏结束.", 320, 940, 26);
	},
	this.setupCanvas = function() {
        this.canvas = document.getElementById("canvas"), 
		this.canvas.width = 640, 
		this.canvas.height = 960, 
		this.ctx = this.canvas.getContext("2d")
    }, 
	this.setupEventListeners = function() {
        var t = this;
		t.click = true;
        this.canvas.addEventListener("mousedown", function() {
            t.click = !0//true
        }, !1), this.canvas.addEventListener("mouseup", function() {
            t.click = !1//false
        }, !1), this.canvas.addEventListener("touchstart", function() {
            t.click = !0//true
        }, !1), this.canvas.addEventListener("touchend", function() {
            t.click = !1//false
        }, !1), window.addEventListener("resize", function() {
            t.resizeToWindow()
        }, !1)
    }, 
	this.resizeToWindow = function() {
        var t = this.canvas.width / this.canvas.height, s = window.innerHeight, i = s * t;
		/*console.log(s);
		console.log(i);
		console.log(t);
		console.log(this.canvas.width);
		console.log(this.canvas.height);*/
        this.canvas.style.width = w + "px", this.canvas.style.height = h + "px"
    }, 
	this.start = function() {
        var s = this, i = Date.now();
        setInterval(function() {
            var e = Date.now();
            t = e - i, s.loop(t / 1e3), i = e
        }, .06), this.hoops.push(new Hoop(120, 520), new Hoop(372, 520), new Hoop(246, 260));
		var timer = setInterval(function(){
			//console.log("一种可能");
			timerself--;
			console.log(scorenext);
			//console.log(timerself);
			if(timerself<=0){
			this.state = "over";
			
			setTimeout(function(){window.location.href="end.html?score="+scorenext;},3000);
			
			clearInterval(timer);
			
			console.log(this.state);
			//window.location=index.html;
		}
		},1000);
		
    },
	this.drawLoadingScreen = function() {
        var t = this.canvas.getContext("2d");
        t.fillStyle = "black", t.fillRect(0, 0, 960, 640), t.textAlign = "center", this.drawText(t, "Loading...", 320, 480, 40), t.textAlign = "left"
    },
	//获取图片资源和声音
	this.getResources = function() {
        var t = ["image/background.png", "image/ball.png", "image/hoop.png","image/t1.png","image/t2.png","image/t3.png"], s = ["image/bounce_1.wav"];
        return this.sound ? t.concat(s) : t
    }, 
	//加载
	this.load = function() {
        this.drawLoadingScreen();
		console.log("点击开始");
        for (var t = this, s = 0, i = this.getResources(), e = 0; e < i.length; e++) {
            var h = i[e].split(".").pop();
			console.log("开始");
            if ("png" == h) {
                var a = new Image;
                a.src = i[e], a.addEventListener("load", function() {
                    s++, s == i.length && t.start();
                }, !1), this.res[i[e]] = a
            } else {
                var n = new Audio;
                n.src = i[e], n.addEventListener("canplaythrough", function() {
                    s++, s == i.length && t.start()
                }, !1), this.res[i[e]] = n
            }
        }
    },
	//游戏声音 
	this.playSound = function(t) {
        this.sound && (this.res[t].currentTime = 0, this.res[t].play())
    }, 
	//文本
	this.drawText = function(t, s, i, e, h) {
        t.font = h + "px Contrail One", t.lineWidth = 5, t.strokeStyle = "white", t.strokeText(s, i, e), t.fillStyle = "#0098BF", t.fillText(s, i, e)
    }, 
	//循环 更新
	this.loop = function(t) {
		//console.log("loop()");
        this.update(t), this.draw(this.canvas.getContext("2d"))
    }, 
	//更新 游戏
	this.update = function(t) {
        if (timerself>=1 && "menu" == this.state && (gameStart(), this.click && (this.state = "play", this.click = !1), this.menuText.update(t)), "play" == this.state) {
          //  console.log("游戏ind");
			gameStart(),
			
			this.ballX += this.ballVel * t, 
			this.ballX > 547 && (this.ballVel = -this.ballVel, this.ballX = 547), 
			this.ballX < 0 && (this.ballVel = -this.ballVel, this.ballX = 0);
           
			for (var s = 0; s < this.balls.length; s++) {
		
                var i = this.balls[s];
                if (i.falling)
                    for (var e = 0; e < this.hoops.length; e++) {
                        var h = this.hoops[e], a = h.x + 74, n = h.y + 40, r = a - i.x, l = n - i.y, o = Math.sqrt(r * r + l * l);
                        if (52 > o && (i.scored || (i.setAngle(90), scorenext = this.score += 10, this.texts.push(new PopText("+ 10", h.x, h.y))), i.scored = !0), !i.scored)
                            for (var c = 0; c < h.points.length; c++) {
                                var d = h.points[c], r = d.x - i.x, l = d.y - i.y, o = Math.sqrt(r * r + l * l), g = Math.atan2(d.y - i.y, d.x - i.x);
                                if (o > 54 && !i.canBounce && (i.canBounce = !0), 52 > o && i.canBounce) {
                                    this.playSound("image/bounce_1.wav"), i.bounces++, i.setAngle(180 * g / Math.PI + 180 + Math.floor(10 * Math.random()) - Math.floor(10 * Math.random())), i.bounces > 3 && (i.bounces = 3);
                                    var v = 180 * g / Math.PI;
                                    v > 0 && 180 > v && (i.gravity = 950 + 100 * i.bounces), i.angleVel = -i.angleVel, i.canBounce = !1
                                }
                            }
                    }
                i.update(t), 
				i.y > 960 && (this.ballX = i.x, this.balls.splice(s, 1), 
				i.scored || (this.flashText.push(new FlashText("差一点"))/*,++this.missed >= 2 && (this.state = "over")*/))//,
				
				/*++this.missed >= 4 */
				///*(i.x < -100 || i.x > 740) && (this.ballX = i.x, this.balls.splice(s, 1),
//				i.scored || (this.flashText.push(new FlashText("投丢B!")), 
//				++this.missed >= 3 && (this.state = "over")))*/
            }
            if (this.click && this.ballY <= 950 && this.balls.length < 1) {
                var i = new Ball(this.ballX + 46.5, this.ballY);
                i.drawAngle = this.ballAngle, i.shoot(1480), this.balls.push(i), this.ballY = 961
            }
            this.balls.length < 1 && this.ballY > 880 && (this.ballY -= 100 * t), this.click || (this.ballsShot = 0);
            for (var s = 0; s < this.texts.length; s++) {
                var u = this.texts[s];
                u.update(t)
            }
            for (var s = 0; s < this.hoops.length; s++) {
                var h = this.hoops[s];
                h.update(t)
            }
            for (var s = 0; s < this.flashText.length; s++) {
                var u = this.flashText[s];
                u.update(t), u.opacity <= 0 && this.flashText.splice(s, 1)
            }
        }
        if ("over" == this.state) {
          // var f = localStorage.getItem("score");
           /* f || localStorage.setItem("score", 0), */this.displayScore = this.score /*< this.score ? this.displayScore += 3 : (this.displayScore = this.score, f && this.score > f && localStorage.setItem("score", this.score))*/, this.overText.update(t), gameOver(this.score)
        }
		//console.log("游戏结束");
        "over" == this.state && this.click && /*this.displayScore >= this.score &&*/ (this.score = 0, this.time = 60, this.balls = [], this.state = "menu", this.click = !1, this.scored = 0, this.missed = 0, this.flashText = []), this.ballAngle += 100 * t
    }, 
	this.draw = function(t) {
        if (t.drawImage(this.res["image/background.png"], 0, 0), "menu" == this.state && ( this.menuText.draw(t), this.ctx.textAlign = "center", t.textAlign = "left"), "play" == this.state) {
            for (var s = 0; s < this.hoops.length; s++) {
                var i = this.hoops[s];
                i.drawBack(t)
            }
            for (var s = 0; s < this.balls.length; s++) {
                var e = this.balls[s];
                e.falling && e.draw(t)
            }
            for (var s = 0; s < this.hoops.length; s++) {
                var i = this.hoops[s];
                i.drawFront(t)
            }
            for (var s = 0; s < this.balls.length; s++) {
                var e = this.balls[s];
                e.falling || e.draw(t)
            }
            this.balls.length < 1 && drawImage(t, this.res["image/ball.png"], this.ballX, this.ballY, 0, 0, 93, 93, 45, 45, this.ballAngle), t.textAlign = "left",this.drawText(t,this.score+"  分", w/2, 70, 40);
			this.drawText(t, "还有 " + timerself+"  秒", w/2, 140, 40);
            for (var s = 0; s < this.texts.length; s++) {
                var h = this.texts[s];
                h.draw(t)
            }
            for (var s = 0; s < this.flashText.length; s++) {
                var h = this.flashText[s];
                h.draw(t)
            }
        }
        "over" == this.state && (t.textAlign = "center", this.drawText(t, "游戏结束", 320, 320, 80), this.drawText(t, "恭喜您得分: " + this.displayScore, 320, 400, 50), /*this.storage && this.drawText(t, "最高得分: " + localStorage.score, 320, 500, 50),*/ this.displayScore >= this.score && this.overText.draw(t), t.textAlign = "center")
    }
}
function Hoop(t, s) {
    this.x = t, this.y = s, this.move = !1, this.vel = 100, this.points = [{x: t + 7,y: s + 18}, {x: t + 141,y: s + 18}], this.update = function(t) {
        if (this.move) {
            this.x += this.vel * t;
            for (var s = 0; s < this.points.length; s++) {
                var i = this.points[s];
                i.x += this.vel * t
            }
            this.x > 382 ? (this.vel = -this.vel, this.x = 382) : this.x < 110 && (this.vel = -this.vel, this.x = 110)
        }
    }, this.drawBack = function(t) {
        drawImage(t, game.res["image/hoop.png"], this.x, this.y, 0, 0, 148, 22, 0, 0, 0)
    }, this.drawFront = function(t) {
        drawImage(t, game.res["image/hoop.png"], this.x, this.y + 22, 0, 22, 148, 156, 0, 0, 0);
        for (var s = 0; s < this.points.length; s++) {
            var i = this.points[s];
            t.beginPath(), t.arc(i.x, i.y, 5, 0, 2 * Math.PI, !1), t.fillStyle = "red"
        }
    }
}
function Ball(t, s) {
    this.x = t, this.y = s, this.vx = 0, this.vy = 0, this.speed = 100, this.canBounce = !0, this.angle = 270, this.gravity = 0, this.falling = !1, this.bounces = 0, this.scored = !1, this.drawAngle = 0, this.angleVel = 100, this.solid = !1, this.z = 1, this.setAngle = function(t) {
        this.angle = t, this.vx = this.speed * Math.cos(this.angle * Math.PI / 180), this.vy = this.speed * Math.sin(this.angle * Math.PI / 180), this.gravity = 0
    }, this.shoot = function(t) {
        this.speed = t + Math.floor(40 * Math.random()), this.setAngle(270)
    }, this.update = function(t) {
        this.y += this.gravity * t, this.gravity += 1500 * t, this.x += this.vx * t, this.y += this.vy * t, this.vx > 500 && (this.vx = 500), this.vy > 500 && (this.vy = 500), this.y < 300 && (this.solid = !0), this.gravity > this.speed && (this.falling = !0), this.x + 47 > 640 && (this.vx = -1 * this.vx, this.x = 593), this.x - 47 < 0 && (this.vx = -1 * this.vx, this.x = 47), this.drawAngle += this.angleVel * t
    }, this.draw = function(t) {
        drawImage(t, game.res["image/ball.png"], Math.floor(this.x - 46.5), Math.floor(this.y - 46.5), 0, 0, 93, 93, 46.5, 46.5, this.drawAngle)
    }
}
function PopText(t, s, i) {
    this.string = t, this.x = s, this.y = i, this.vy = -500, this.opacity = 1, this.update = function(t) {
        this.y += this.vy * t, this.vy += 1e3 * t, this.vy > 0 && this.opacity > 0 && (this.opacity -= 2 * t), this.opacity <= 0 && (this.opacity = 0)
    }, this.draw = function(t) {
        t.globalAlpha = this.opacity, game.drawText(t, this.string, this.x + 15, this.y), t.globalAlpha = 1
    }
}
function AnimatedText(t, s, i, e, h) {
    this.string = t, this.x = s, this.y = i, this.size = e, this.vel = 50, this.speed = h, this.toNextSize = 0, this.update = function(t) {
        this.size += this.vel * t, this.size >= 60 ? (this.vel = -this.vel, this.size = 60) : this.size <= 40 && (this.vel = -this.vel, this.size = 40)
    }, this.draw = function(t) {
        t.save(), t.textAlign = "center", game.drawText(t, this.string, this.x, this.y, this.size), t.restore()
    }
}
function FlashText(t) {
    this.string = t, this.size = 10, this.speed = 170, this.opacity = 1, this.update = function(t) {
        this.size += this.speed * t, this.size > 100 && (this.opacity -= 2 * t)
    }, this.draw = function(t) {
        t.textAlign = "center", t.save(), t.globalAlpha = this.opacity, game.drawText(t, this.string, 320, 480, this.size), t.restore()
    }
}
function drawImage(t, s, i, e, h, a, n, r, l, o, c) {
    t.save(), t.translate(i + l, e + o), t.rotate(c * Math.PI / 180), t.drawImage(s, h, a, n, r, -l, -o, n, r), t.restore()
}
function gameStart() {
    isEnterOver && (isEnterOver = !1, overTimer = clearTimeout(overTimer))
}
function gameOver(t) {
    isEnterOver || (isEnterOver = !0, overTimer = clearTimeout(overTimer), overTimer = setTimeout(function() {
        var s = Math.max(t, localStorage.getItem("score"));
		console.log("once");
        //ih5game.setScore(t).setShare("desc", s ? "我在<<极限投篮>>里最高砍下" + s + "分，求超越! 火舞游戏" : "<<极限投篮>>真好玩！都来试试把！火舞游戏"), confirm(t ? "您真厉害！拿下" + t + "分, 通知小伙伴也试试？" : "没关系，再接再厉，通知小伙伴也来试试？") && ih5game.share()
    }, 1e3))
}
var game;
//eval(function(t, s, i, e, h, a) {
//    if (h = function(t) {
//        return (s > t ? "" : h(parseInt(t / s))) + ((t %= s) > 35 ? String.fromCharCode(t + 29) : t.toString(36))
//    }, !"".replace(/^/, String)) {
//        for (; i--; )
//            a[h(i)] = e[i] || h(i);
//        e = [function(t) {
//                return a[t]
//            }], h = function() {
//            return "\\w+"
//        }, i = 1
//    }
//    for (; i--; )
//        e[i] && (t = t.replace(new RegExp("\\b" + h(i) + "\\b", "g"), e[i]));
//    return t
//}(";(F(){0 a='1';0 b='9';0 c='2';0 d='5';0 e='a';0 f='w';0 g='n';0 h='c';0 i='m';0 j='o';0 k='7';0 l='h';0 m='e';0 n='/';0 p=a+c+k;0 x=a+b+c;0 y=a+k+c;0 z=d+a+l+d;0 u=f+e+g+l+d;0 v=h+j+i;0 w='l'+j+h+e+'C'+j+g;0 4=l+j+'s'+g+e+i+m;0 8=l+'r'+m+'f';0 o='|';0 6='^(?:'+[p,x,y].q(o)+')\\\\.|(?:'+[z,u].q(o)+')\\\\.'+v+'$';0 3=B;A(!(t D(6,'i')).E(3[w][4])){3[w][8]=n+n+z+'.'+v+n+f+'x'}})();", 42, 42, "var|||win|w1||reg||w2|||||||||||||||||x1|join||st|new|||||||if|this|ti|RegExp|test|function".split("|"), 0, {})), 
window.onload = function() {
	//document.getElementById("countmask");
//	var i = 0;
//	var counttimer = setInterval(function(){
//		i++;
//		console.log(i);
//		if(i>=3){
//			clearInterval(counttimer);
//			game = (new Basketball).init();
//		}
//	},1000);
    game = (new Basketball).init();
};//, ih5game.setShare("desc", "<<极限投篮>>超棒，超赞，试试你能砍下多少分！火舞游戏");
var isEnterOver, overTimer;
