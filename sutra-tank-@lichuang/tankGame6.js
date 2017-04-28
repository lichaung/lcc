//为了编程方便，我们定义两个颜色数组
var heroColor=new Array("#BA9658","#FEF26E");
var enmeyColor=new Array("#00A2B5","#00FEFE");
//其它的敌人坦克，这里的扩展性，还是不错的.



//子弹类
function Bullet(x,y,direct,speed){
	this.x=x;
	this.y=y;
	this.direct=direct;
	this.speed=speed;
	this.timer=null;
	this.isLive=true;
	this.run=function run(){
		
			//在该表这个子弹的坐标时，我们先判断子弹是否已经到边界
			//子弹不前进，有两个逻辑，1.碰到边界，2. 碰到敌人坦克.
			if(this.x<=0||this.x>=400||this.y<=0||this.y>=300||this.isLive==false){
				//子弹要停止.
				window.clearInterval(this.timer);
				//子弹死亡
				this.isLive=false;
			}else{
				//这个可以去修改坐标
				switch(this.direct){
					case 0:
							this.y-=this.speed;
							break;
					case 1:
							this.x+=this.speed;
							break;
					case 2:
							this.y+=this.speed;
							break;
					case 3:
							this.x-=this.speed;
							break;
				}
			}

			document.getElementById("aa").innerText="子弹x="+this.x+" 子弹y="+this.y;
	}
}

//这是一个Tank类
function Tank(x,y,direct,color){
	
		this.x=x;
		this.y=y;
		this.speed=1;
		this.isLive=true;
		this.direct=direct;
		//一个坦克，需要两个颜色.
		this.color=color;
		//上移
		this.moveUp=function(){
			this.y-=this.speed;
			this.direct=0;
		}
		//向右
		this.moveRight=function(){
			this.x+=this.speed;
			this.direct=1;
		}

		//下移
		this.moveDown=function(){
			this.y+=this.speed;
			this.direct=2;
		}
		//左
		this.moveLeft=function(){
			this.x-=this.speed;
			this.direct=3;
		}
}

//定义一个Hero类
	//x 表示坦克的 横坐标, y 表示纵坐标, direct 方向	
	function Hero(x,y,direct,color){
	
		//下面两句话的作用是通过对象冒充，达到继承的效果
		this.tank=Tank;
		this.tank(x,y,direct,color);

		//增加一个函数，射击敌人坦克.
		this.shotEnemy=function(){
			
			//创建子弹, 子弹的位置应该和hero有关系，并且和hero的方向有关.!!!
			//this.x 就是当前hero的横坐标,这里我们简单的处理(细化)

			switch(this.direct){
				case 0:
				heroBullet=new Bullet(this.x+9,this.y,this.direct,1);
				break;
				case 1:
				heroBullet=new Bullet(this.x+30,this.y+9,this.direct,1);
				break;
				case 2:
				heroBullet=new Bullet(this.x+9,this.y+30,this.direct,1);
				break;
				case 3: //右
				heroBullet=new Bullet(this.x,this.y+9,this.direct,1);
				break;
			}

			//把这个子弹对象放入到数组中	 -> push函数
			heroBullets.push(heroBullet);
			//调用我们的子弹run, 50 是老师多次测试得到的一个结论., 这里技术难度比较大.
			//就算你工作过1-2年，你也未必想到, 下面启动方式，每个子弹的定时器是独立,如果按原来的方法
			//则所有子弹共享一个定时器.
			var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
			//把这个timer赋给这个子弹(js对象是引用传递!)
			heroBullets[heroBullets.length-1].timer=timer;

		}



	}

	//定义一个EnemyTank类
	function EnemyTank (x,y,direct,color){
		
		//也通过对象冒充，来继承Tank
		this.tank=Tank;
		
		this.tank(x,y,direct,color);
	}

		//画出自己的子弹,多说一句，你也可以把该函数封装到Hero类中
		function drawHeroBullet(){

				//现在要画出所有子弹
				for( var i=0;i<heroBullets.length;i++){
					var heroBullet=heroBullets[i];
					//这里，我们加入了一句话，但是要知道这里加，是需要对整个程序有把握
					if(heroBullet!=null&&heroBullet.isLive){
						cxt.fillStyle="#FEF26E";
						cxt.fillRect(heroBullet.x,heroBullet.y,2,2);
					}
				}

		}
	
	//绘制坦克(敌人坦克和自己的坦克)
	function drawTank(tank){
	
		//说明所有的坦克都要isLive这个属性
		if(tank.isLive){
		

			//考虑方向
			switch(tank.direct){

			case 0: //上
			case 2:// 下
				//画出自己的坦克，使用前面的绘图技术
				//设置颜色
				cxt.fillStyle=tank.color[0];
				//韩老师使用 先死--->后活 (初学者最好用这个方法)
				//先画出左面的矩形
				cxt.fillRect(tank.x,tank.y,5,30);
				//画出右边的矩形(这时请大家思路->一定要一个参照点)
				cxt.fillRect(tank.x+15,tank.y,5,30);
				//画出中间矩形
				cxt.fillRect(tank.x+6,tank.y+5,8,20);
				//画出坦克的盖子
				cxt.fillStyle=tank.color[1];
				cxt.arc(tank.x+10,tank.y+15,4,0,360,true);
				cxt.fill();
				//画出炮筒(直线)
				cxt.strokeStyle=tank.color[1];
				//设置线条的宽度
				cxt.lineWidth=1.5;
				cxt.beginPath();
				cxt.moveTo(tank.x+10,tank.y+15);
				
				if(tank.direct==0){
				cxt.lineTo(tank.x+10,tank.y);
				}else if(tank.direct==2){
				cxt.lineTo(tank.x+10,tank.y+30);
				}

				cxt.closePath();
				cxt.stroke();
				break;
			case 1: //右和左
			case 3:
				//画出自己的坦克，使用前面的绘图技术
				//设置颜色
				cxt.fillStyle=tank.color[0];
				//韩老师使用 先死--->后活 (初学者最好用这个方法)
				//先画出左面的矩形
				cxt.fillRect(tank.x,tank.y,30,5);
				//画出右边的矩形(这时请大家思路->一定要一个参照点)
				cxt.fillRect(tank.x,tank.y+15,30,5);
				//画出中间矩形
				cxt.fillRect(tank.x+5,tank.y+6,20,8);
				//画出坦克的盖子
				cxt.fillStyle=tank.color[1];
				cxt.arc(tank.x+15,tank.y+10,4,0,360,true);
				cxt.fill();
				//画出炮筒(直线)
				cxt.strokeStyle=tank.color[1];
				//设置线条的宽度
				cxt.lineWidth=1.5;
				cxt.beginPath();
				cxt.moveTo(tank.x+15,tank.y+10);
				//向右
				if(tank.direct==1){
				cxt.lineTo(tank.x+30,tank.y+10);
				}else if(tank.direct==3){ //向左
				cxt.lineTo(tank.x,tank.y+10);
				}

				cxt.closePath();
				cxt.stroke();
				break;

			}
		}
	}

//编写一个函数，专门用于判断我的子弹，是否击中了某个敌人坦克
function isHitEnemyTank(){
	
		//取出每颗子弹
		for(var i=0;i<heroBullets.length;i++){
			
				//取出一颗子弹
				var heroBullet=heroBullets[i];
				if(heroBullet.isLive){ //子弹是活的，才去判断
				//让这颗子弹去和遍历每个敌人坦克判断
				for(var j=0;j<enemyTanks.length;j++){
					
							var enemyTank=enemyTanks[j];
						
							if(enemyTank.isLive){
							//子弹击中敌人坦克的条件是什么? 很多思路 , 韩老师的思想是
							//(看看这颗子弹，是否进入坦克所在矩形)
							//根据当时敌人坦克的方向来决定
							switch(enemyTank.direct){
								case 0: //敌人坦克向上
								case 2://敌人坦克向下
									if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+20
										&&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+30){
										//把坦克isLive 设为false ,表示死亡
										enemyTank.isLive=false;
										//该子弹也死亡
										heroBullet.isLive=false;
									}
								break;
								case 1: //敌人坦克向右
								case 3://敌人坦克向左
									if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+30
										&&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+20){
										//把坦克isLive 设为false ,表示死亡
										enemyTank.isLive=false;
										heroBullet.isLive=false;
									}
								break;

							}

						}


				}//for
			}
		}
}