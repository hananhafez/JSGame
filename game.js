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
		container.style.backgroundImage="url("+this.src+")";
		
		container.style.width=w+"px";
		container.style.height=h+"px";
		container.style.bottom=y+"px";
		container.style.left=x+"px";
	}
	

};






var game = function  () {
	this.start= function () {
		var x = new player('khaled gamal',document.getElementById('car1'));
		x.src="car1.png";
		x.display(150,150,50,50);
		document.addEventListener('keydown', function(e){x.move(e)}, false);	
		var rood = new road("mainroad.gif");
		rood.init();
	}
}


var s = new game();
s.start();