var car1=document.getElementById('car1');
var audio1=document.getElementById('audio1');
var audio2=document.getElementById('audio2');
var game=document.getElementById('container');
var w=
document.body.style.backgroundImage="url('road1.jpg')";
document.body.style.backgroundSize="480px 720px";
car1.style.height="150px";
car1.style.marginTop="400px";
car1.style.marginLeft="190px";
var speedUp;
var speedDown;
var j=0
function acc(){

roads=["url('road4.jpg')","url('road5.jpg')","url('road1.jpg')","url('road0.jpg')"];

if(j>3){j=0;}
for(var i=0; i<roads.length;i++){
  if(i==j){
    document.body.style.backgroundImage=roads[i];
  }
}
j++;
}

function left(){
  car1.style.marginLeft=parseInt(car1.style.marginLeft) - 5 + 'px';
  audio1.play();
}
function right(){
  car1.style.marginLeft=parseInt(car1.style.marginLeft) + 5 +'px';
  audio1.play();
}
function up(){
  car1.style.marginTop=parseInt(car1.style.marginTop) - 5 + 'px';
  if(!speedUp){
    speedUp=setInterval(acc,150);
  }
if(speedDown){
  clearInterval(speedDown);
}
speedDown=0;
  audio1.play();
  audio2.pause();
}
function down(){
  car1.style.marginTop=parseInt(car1.style.marginTop) + 5 + 'px';
if(speedUp){

clearInterval(speedUp);
}
speedUp=0;
  audio2.play();
  audio1.pause();
if(!speedDown) {
  speedDown=setInterval(acc,300);
 }
}

function move(event){
  switch (event.keyCode) {
    case 39:
      right();
      break;
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 40:
      down();
      break;
}
};

function start(){
  move();
  setTimeout("start()",1000);
}
