var Paralax = function(leftCanvas, rightCanvas) {
	this.left = document.getElementById(leftCanvas).getContext("2d");
	this.right = document.getElementById(rightCanvas).getContext("2d");

	this.canvasWidth =  window.innerWidth/2;
	this.canvasHeight = screen.height;

	//Geometric Model Variables
	this.a = this.canvasWidth/2;
	this.c = this.canvasHeight/2;
	this.b = this.a / Math.tan(Paralax.FOV/2);
	this.theta0 = Math.atan(this.b / this.a);
	this.theta = Math.PI - (2 * this.theta0);
	this.theta1 = Math.atan(this.b / this.c);
	this.thetaY = Math.PI - (2 * this.theta1);

	//Test variables (object variables)
	this.x = [0,0,0];
	this.y = [0,0,0];
	this.z = [0,0,0];

	//Test Model Variables
	this.count=0;

	this.shapes = [];

	this.run = function() {
		console.log(this.left);
		this.left.fillStyle = "#FFFFFF";
		this.right.fillStyle = "#FFFFFF";
		this.left.fillRect(0,0,this.canvasWidth,this.canvasHeight);
		this.right.fillRect(0,0,this.canvasWidth,this.canvasHeight);

		this.left.fillStyle = "#000000";
		this.right.fillStyle = "#000000";

		for(var i = 0;i<x.length;i++){
			//Prints all the of spheres using arrays and the screen position functions (the )
			this.left.beginPath();
			this.left.arc(leftX(x[i],y[i],z[i]),leftY(x[i],y[i],z[i]),findRadius(x[i],y[i],z[i],30),0,2*Math.PI);
			this.left.fill();

			this.right.beginPath();
			this.right.arc(rightX(x[i],y[i],z[i]),rightY(x[i],y[i],z[i]),findRadius(x[i],y[i],z[i],30),0,2*Math.PI);
			this.right.fill();
		}


		x = [300*Math.cos(count),300*Math.cos(count),-300*Math.cos(count),-300*Math.cos(count),0];
		y = [300*Math.cos(count),-300*Math.cos(count),300*Math.cos(count),-300*Math.cos(count),0];
		z = [500 + 300*Math.sin(count),500 + 300*Math.sin(count),500 - 300*Math.sin(count),500 - 300*Math.sin(count),500];

		count+=.07;
	}

	var that = this
	this.timer = setInterval(function() {return that.run.apply(that);}, 1000/Paralax.FPS);
} || {};

Paralax.toRadians = function (angle) {
  return angle * (Math.PI / 180);
}

// Frames per second
Paralax.FPS = 30;

// Field of vision in radians
Paralax.FOV = Paralax.toRadians(120);

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
