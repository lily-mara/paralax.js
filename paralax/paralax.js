//Set frames per second
var fps = 30;
var fov = 120;//horizontal field of vision in degrees

//Geometric Model Constants
var theta,thetaY,theta0,theta1,a,b,c;

//various variables
var canvasHeight,canvasWidth,timer;

//Test variables (object variables)
var count;
var x = [0,0,0];
var y = [0,0,0];
var z = [0,0,0];

function start(){

	//Geometric Model Variables
	a = canvasWidth/2;
	c = canvasHeight/2;
	fov *= .0174532925;//convert to radians
	b = a / Math.tan(fov/2);
	theta0 = Math.atan(b/a);
	theta = Math.PI - (2*theta0);
	theta1 = Math.atan(b/c);
	thetaY = Math.PI - (2*theta1);

	//Test Model Variables
	count=0;

	timer = setInterval(run,1000/fps);;
}


function run(){
	var ctl = document.getElementById("left").getContext("2d");
	var ctr = document.getElementById("right").getContext("2d");

	ctl.fillStyle = "#FFFFFF";
	ctr.fillStyle = "#FFFFFF";
	ctl.fillRect(0,0,canvasWidth,canvasHeight);
	ctr.fillRect(0,0,canvasWidth,canvasHeight);

	ctl.fillStyle = "#000000";
	ctr.fillStyle = "#000000";

	for(var i = 0;i<x.length;i++){
		//Prints all the of spheres using arrays and the screen position functions (the )
		ctl.beginPath();
		ctl.arc(leftX(x[i],y[i],z[i]),leftY(x[i],y[i],z[i]),findRadius(x[i],y[i],z[i],30),0,2*Math.PI);
		ctl.fill();

		ctr.beginPath();
		ctr.arc(rightX(x[i],y[i],z[i]),rightY(x[i],y[i],z[i]),findRadius(x[i],y[i],z[i],30),0,2*Math.PI);
		ctr.fill();
	}


	x = [300*Math.cos(count),300*Math.cos(count),-300*Math.cos(count),-300*Math.cos(count),0];
	y = [300*Math.cos(count),-300*Math.cos(count),300*Math.cos(count),-300*Math.cos(count),0];
	z = [500 + 300*Math.sin(count),500 + 300*Math.sin(count),500 - 300*Math.sin(count),500 - 300*Math.sin(count),500];

	count+=.07;

	if(z<0) {
		clearInterval(timer);
	}
}



//Screen Position Functions in Terms of 3D Position
function leftX(x,y,z){
	thetaL = Math.atan((a+x)/(z+b));
	return (canvasWidth/2)+(Math.tan(thetaL)*b);
}

function leftY(x,y,z){
	thetaV = Math.atan(y/(z+b));
	return (canvasWidth/2) - (b*Math.tan(thetaV));
}

function rightX(x,y,z){
	thetaL = Math.atan((x-a)/(z+b));
	return (canvasWidth/2)+(Math.tan(thetaL)*b);
}

function rightY(x,y,z){
	return leftY(x,y,z);//Same function because assuming no head tilt
}

function findRadius(x,y,z,realRadius){
	return leftY(x,y-realRadius,z)-leftY(x,y,z);
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
	return 0;
}

function Sphere(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.update = function() {

	}

	this.left = function () {
		var thetaV = Math.atan(y/(z+b));
		var leftY = (canvasWidth/2) - (b*Math.tan(thetaV));

		var thetaL = Math.atan((a+x)/(z+b));
		var leftX = (canvasWidth/2)+(Math.tan(thetaL)*b);

		return new Coordinate(leftX, leftY);
	}

	this.right = function () {
		var thetaL = Math.atan((x-a)/(z+b));
		var rightX = (canvasWidth/2)+(Math.tan(thetaL)*b);

		var rightY = this.left().y;

		return new Coordinate(rightX, rightY);
	}
}

function Coordinate(x, y) {
	this.x = x;
	this.y = y;
}
