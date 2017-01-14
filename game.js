
var road = function ( src ) {

	var level;
	this.src = src;
	this.rightX=200;
	this.rightY=200
	this.leftX=800;
	this.leftY=200;

	Object.defineProperty(this, 'level', {configurable:true,
		enumerable:true,
		set:function (n) {
			level = n;
		},
		get:function () {
			return level.src;
		}
	});



	this.init = function () {
		document.getElementById("road").style.backgroundImage="url("+this.src+")";
	}
	this.level = level;



}



var player = function  (name,container) {
	var src , carX;
	this.name = name;
	this.container=container;
	Object.defineProperty(this, 'src', {configurable:true,
		enumerable:true,

		set:function (n) {
			src = n;
		},

		get:function () {
			return src;
		}
	});

	Object.defineProperty(this, 'carX', {configurable:true,
		enumerable:true,
		set:function (n) {
			carX = n;
		},
		get:function () {
			return carX;
		}
	});
	this.move = function (event) {
		switch (event.keyCode) {
			case 37:
				// this.container.style.marginLeft=parseInt(car1.style.marginLeft) - 5 + 'px';
				this.container.style.left=parseInt(this.container.style.left)-3+"px";
				break;
			case 39:
				this.container.style.left=parseInt(this.container.style.left)+3+"px";
				break;
		}
	}
	this.src = src;
	this.carX = carX;
	this.display = function (w,h,x,y) {
//		container.style.backgroundImage="url("+this.src+")";

		container.style.width=w+"px";
		container.style.height=h+"px";
		container.style.bottom=y+"px";
		container.style.left=x+"px";
	}


};

var movingCar = function(source,w,h,x,y){
	this.source= source;
	this.w = w;
	this.h = h;
	this.x = x;
	this.y=y;


	Object.defineProperty(this,'y', {
		get: function () {
			return y;
		},
		set: function(yinput){
			y = yinput;
			this.Img.style.top = y + 'px';

		}
	});
	Object.defineProperty(this,'x',{
		get: function (){
			return x;
		},
		set: function(xinput){
			 x = xinput;
			 this.Img.style.left = x + 'px';
		}
	});
	Object.defineProperty(this, 'source', {
			get: function () {
					return source;
			},
			set: function (newSource) {
					source = newSource
					this.Img.src = this.source;
			}
	});

}

movingCar.prototype.setWidth = function(W){
    this.w = W;
}
movingCar.prototype.setHeight = function(H){
    this.h = H;
}
movingCar.prototype.setX = function(X){
    this.x = X;
}
movingCar.prototype.setY = function(Y){

    this.y = Y;
}
movingCar.prototype.getX = function(){
    return this.x;
}
movingCar.prototype.getY = function(){
    return this.y;
}
movingCar.prototype.setSource = function(s){
    this.source = s;
}

movingCar.prototype.appendImg = function(parentId){
    this.Img = document.createElement("img");
    this.Img.src = this.source;
    this.Img.style.width = this.w + "px";
    this.Img.style.height = this.h + "px";
    this.Img.style.top = this.y + "px";
    this.Img.style.left = this.x + "px";
		this.Img.style.position= "absolute";
    var pElement = document.getElementById(parentId);
    pElement.appendChild(this.Img);
}

movingCar.prototype.movecars = function(car,step){
    car.y += step;

		if (car.y>540)
		{
			car.erase();
		}
}

movingCar.prototype.erase = function(){
    var pElement = this.Img.parentElement;
    pElement.removeChild(this.Img);
}

var game = function  () {
	this.start= function () {
		var x = new player('khaled gamal',document.getElementById('car1'));
		x.src="car4.png";
		x.display(50,75,300,300);
		document.addEventListener('keydown', function(e){x.move(e)}, false);
		var rood = new road("mainroad.gif");
		rood.init();
		var carw= new movingCar('car4.png',50,75,150,0);
        var car2= new movingCar('car1.png',120,75,300,0);
		var car3= new movingCar('enamy.png',60,90,450,0);
		car3.appendImg("road");
		car2.appendImg("road");
	    carw.appendImg("road");
	    setInterval(car3.movecars,80,car3,5);
		setInterval(carw.movecars,100,carw,5);
        setInterval(car2.movecars,60,car2,5);
	
	}
}


var s = new game();
s.start();
