var counterInterval='';
var genrate ;
var move ;


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
        document.body.insertBefore(road,document.getElementById("mainContainer"));
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
   // this.winMassege=function()
    //{
      //  var msg = document.createElement("div");
       // msg.style.width="100px";
        //msg.style.height="100px";
       // msg.style.backgroundImage="url('./images/lvl2.png')";
         //   msg.style.backgroundSize="cover";
        //this.container.appendChild(msg);

    //};

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
        console.log(this.container.style.left);
        switch (event.keyCode) {
            case 37:
                if(x>minx+20){
                    this.container.style.left=parseInt(this.container.style.left)-25+"px";
                  this.x-=25

                }
                break;
            case 39:
                if(x<maxx-20){
                    this.container.style.left=parseInt(this.container.style.left)+25+"px";
                this.x+=25;

                }
                break;
        }
    }
    this.checkLose=function () {
        if(this.isHit){
            clearInterval(genrate);
            clearInterval(move);

         //   var msg = document.createElement("div");
         //   msg.style.backgroundImage="url('./images/lvl2.png')";
         //   msg.style.width="100px";
          //  msg.style.height="100px";
           // msg.style.backgroundSize="cover";

            //this.container.appendChild(msg);
            console.log("crash");
          var modal = document.getElementsByClassName('modalDialog')[0];
           var message = document.getElementById('message');
            var next = document.getElementById('good');
          next.style.visibility = 'hidden';
            message.innerHTML="Sorry 1!!!!!!!!!<br /> You have lost ";
            modal.style.opacity='1';

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
        console.log("-------------"+player.x );
        if(this.y+this.height >=player.y && this.y+this.height <=player.y+player.height){
            if( this.x >= player.x && this.x<=player.x+player.width )
                return true;
            if(this.x+this.width >=player.x && this.x + this.width <=player.x+player.width)
                return true;
        }
    }
}


var imgs=["./images/player1-top.png","./images/player2-top.png"];
var intro=["./images/player1-intro.png","./images/player2-intro.png"];
var cars =  document.getElementsByClassName("player");
var page = document.getElementById('mainContainer');
var flag = 0;
window.addEventListener('click',function(e){

    if(e.target.matches('img')){
        choise=e.target.getAttribute('src');

        if(choise==intro[1]){
            flag=1;
            Defaults.player.src = imgs[1];
            page.remove();
            initGame ();
        }else if(choise==intro[0]){
            flag=1;
            Defaults.player.src = imgs[0];
            page.remove();
            initGame ();
        }



     }
});

var audio = document.getElementById('audio');
audio.play();

function initGame () {

    document.body.style.backgroundImage="url('./images/back3.png')";
    console.log(document.body.style.backgroundImage);
    var player1=new Player("player1",Defaults.player.width,Defaults.player.height,Defaults.player.x,Defaults.player.y,Defaults.player.src);
    var road1=new Road("road1",Defaults.road.width,Defaults.road.height,Defaults.road.src,player1);
    road1.draw();
    document.addEventListener('keydown', function(e){player1.move(e,0,road1.width-player1.width)}, false);
    genrate=setInterval(function(){road1.generateCar()},600);
    console.log(genrate);
    move=setInterval(function(){
        road1.updatePosition();
        player1.checkLose();
    },40);
    //msg=setInterval(function(){road1.winMassege();},1000);


}
// var counter=0;
// var timer = document.getElementById('timer');
// if (counterInterval !='') {
// var counterDiv = document.getElementById('counter').style.visibility = 'visible';
// }
// counterInterval=window.setInterval(function (event) {
//     console.log(timer);
//     if(parseInt(timer.innerHTML) < 20){
//         timer.innerHTML=counter++;
//     }
//     else{
//         modal.style.opacity='1';
//     }
// } , 1000);

///////////////////////////////////////////////////////////////
