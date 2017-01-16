var Defaults={
    road: {
        width: 545,
        height: 700,
        src:"images/mainroad.gif"
    },
    car:{
        width: 50,
        height: 100
    },
    player:{
        width: 70,
        height: 150,
        x:150,
        y:400,
        src:"images/car0.png"
    }
}

var Helpers={
    carSrcs:["images/enamy.png","images/enamy2.png","images/enamy3.png","images/enamy4.png"],
    getRandomSrc:function(){
        return this.carSrcs[parseInt(Math.random() * this.carSrcs.length)];
    },
    getRandomX:function (){
        return parseInt(Math.random() * (Defaults.road.width-Defaults.car.width-50))+Defaults.car.width+10;
    },
    getRandomY:function () {
        return parseInt(Math.random() * 50)+Defaults.car.height;
    },
    getRandomSpeed:function (max) {
        return parseInt(Math.random() * max)+10;
    }
}

var Road=function (name,width,height,src,player){
    this.name=name;
    this.src=src;
    this.width=width;
    this.height=height;
    this.cars=[];
    this.player=player;
    this.container=null;
    this.draw=function () {
        var road=document.createElement("div");
        road.style.width=this.width+"px";
        road.style.height=this.height+"px";
        road.style.backgroundImage="url("+this.src+")";
        road.id=this.name;
        road.classList.add("road");
        this.player.y=this.height-this.player.height-50;
        road.appendChild(this.player.draw());
        document.body.appendChild(road);
        this.container=road;
    }
    this.generateCar=function(){
        var car=new Car(new Date().getTime(),Defaults.car.width,Defaults.car.height,Helpers.getRandomX(),-Helpers.getRandomY(),Helpers.getRandomSrc());
        this.cars.push(car);
        this.container.appendChild(car.draw());
    }
    this.updatePosition=function(){
        for (var i = 0; i < this.cars.length; i++) {
            if(this.cars[i].isOut) {
                this.cars[i].destroy();
                this.cars.splice(i, 1);
            }else {
                this.cars[i].y += Helpers.getRandomSpeed(20);
                this.cars[i].move();
                if(this.cars[i].isCollid(this.player)){
                    this.player.isHit=true;
                    console.log("hit")
                }
            }
        }
    }

}
var Player=function (name,width,height,x,y,src) {
    this.name=name;
    this.src=src;
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    this.container=null;
    this.isHit=false;
    this.draw=function () {
        var player=document.createElement("div");
        player.style.width=this.width+"px";
        player.style.height=this.height+"px";
        player.style.left=this.x+"px";
        player.style.top=this.y+"px";
        player.id=this.name;
        player.style.backgroundImage="url("+this.src+")";
        player.classList.add("player");
        this.container=player;
        return player;
    }
    this.move = function (event,minx,maxx) {
        var x=parseInt(this.container.style.left);
        switch (event.keyCode) {
            case 37:
                if(x>minx+20){
                    this.container.style.left=parseInt(this.container.style.left)-10+"px";
                    this.x-=20
                }
                break;
            case 39:
                if(x<maxx-20){
                    this.container.style.left=parseInt(this.container.style.left)+10+"px";
                    this.x+=20
                }
                break;
        }
    }
    this.checkLose=function () {
        if(this.isHit){
            clearInterval(genrate);
            clearInterval(move);
            // var lose=document.createElement("div");
            // var losetext=document.createElement("h1");
            // losetext.textContent="YOU LOSE";
            // lose.classList.add("lose");
            // lose.appendChild(losetext);
            // document.body.appendChild(lose);

            var modal = document.getElementsByClassName('modalDialog')[0];
window.addEventListener('click',function (event) {
    modal.style.opacity=1;
});
var counter=0;
var timer = document.getElementById('timer');
var counterInterval='';
counterInterval=window.setInterval(function (event) {
    console.log(timer);
    if(parseInt(timer.innerHTML) < 20){
        timer.innerHTML=counter++;
    }
    else{
        modal.style.opacity='1';
    }
} , 1000);


        }
    }
}
var Car=function (name,width,height,x,y,src) {
    this.name=name;
    this.src=src;
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    this.container=null;
    this.isOut=false;
    this.draw=function () {
        var car=document.createElement("div");
        car.style.width=this.width+"px";
        car.style.height=this.height+"px";
        car.style.left=this.x+"px";
        car.style.top=this.y+"px";
        car.id=this.name;
        car.style.backgroundImage="url("+this.src+")";
        car.classList.add("cars");
        this.container=car;
        return car;
    }
    this.move=function () {
        if(this.y>=Defaults.road.height+this.height){
            this.isOut=true;
        }else{
            this.container.style.top=this.y+"px";
        }

    }
    this.destroy=function(){
        var car=document.getElementById(this.name);
        car.parentNode.removeChild(car);
    }
    this.isCollid=function(player){
        var playerpoin={x:player.x,y:player.y};
        var myp={x:this.x,y:this.y};
        var mypdownleftmost={x:myp.x , y:myp.y+this.height}
        var myprightmost={x:myp.x+ this.width, y:myp.y+this.height}
        if(this.y+this.height >=player.y ){
            if( this.x >= player.x && this.x<=player.x+player.width )
                return true;
            if(this.x+this.width >=player.x && this.x + this.width <=player.x+player.width)
                return true;
        }
    }
}
