var selection;
var imgs=["../images/player1-top.png","../images/player2-top.png"];
var page =  document.getElementById("selectionPage");
var cars =  document.getElementsByTagName("span");
cars[0].addEventListener('click',function(e){cars[0].style.width="1000px"});


var road = function ( src ) {
	
	var level;
	this.src = src;
	this.rightX=145;
	this.rightY=100
	this.leftX=700;
	this.leftY=175;

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
		document.getElementById("road").style.backgroundSize="cover";
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
				//if()
				//{
					this.container.style.left=parseInt(this.container.style.left)-5+"px";
					console.log(this.container.style.left);
					break;
				//}
				
			case 39:
				//if()
				//{
					this.container.style.left=parseInt(this.container.style.left)+5+"px";
					console.log(this.container.style.left);
					break;		
				//}
				
		}
	}
	this.src = src;
	this.carX = carX;
	this.display = function (w,h,x,y) {
		container.style.backgroundImage="url("+this.src+")" ;
		
		container.style.width=w+"px";
		container.style.height=h+"px";
		container.style.bottom=y+"px";
		container.style.left=x+"px";
	}
	

};






var game = function  () {
	this.start= function () {
		var x = new player('khaled gamal',document.getElementById('car1'));
		x.src=selection;
		x.display(100,168,690,20);
		document.addEventListener('keydown', function(e){x.move(e)}, false);	
		var rood = new road("../images/mainroad.gif");
		rood.init();
	}
}

page.addEventListener('click',function(e){

    if(e.target.matches('button')){
        choise=e.target.innerHTML;
	choise=choise.trim();
	console.log("choice"+choise);
        switch (choise){
		case "player 1":
		selection=imgs[0];
		break;
		case "player 2":
		selection=imgs[1];
		break;
		}
	
	console.log("select :"+selection);
	page.remove();
	document.body.style.backgroundImage="url('../images/sand.jpg')";
	var s = new game();
	s.start();
	 } 
});

