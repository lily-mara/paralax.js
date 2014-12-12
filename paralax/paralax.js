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
	this.count = 0;

	this.shapes = [];

	this.run = function() {
		this.left.fillStyle = "#FFFFFF";
		this.right.fillStyle = "#FFFFFF";
		this.left.fillRect(0,0,this.canvasWidth,this.canvasHeight);
		this.right.fillRect(0,0,this.canvasWidth,this.canvasHeight);

		this.left.fillStyle = "#000000";
		this.right.fillStyle = "#000000";

		for(var i = 0; i < this.shapes.length; i++){
			var s = this.shapes[i];
			var shapeLeft = s.left();
			var shapeRight = s.right();
			var radius = s.radius();

			this.left.beginPath();
			this.left.arc(shapeLeft.x, shapeLeft.y, radius, 0, 2*Math.PI);
			this.left.fill();
			this.left.closePath();

			this.right.beginPath();
			this.right.arc(shapeRight.x, shapeRight.y, radius, 0, 2*Math.PI);
			this.right.fill();
			this.right.closePath();

			s.update(this.count);
		}


		// var x = [300*Math.cos(count),300*Math.cos(count),-300*Math.cos(count),-300*Math.cos(count),0];
		// var y = [300*Math.cos(count),-300*Math.cos(count),300*Math.cos(count),-300*Math.cos(count),0];
		// var z = [500 + 300*Math.sin(count),500 + 300*Math.sin(count),500 - 300*Math.sin(count),500 - 300*Math.sin(count),500];

		this.count += 0.07;
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

function Sphere(x, y, z, updateFunction, paralaxInstance, radius=30) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.instance = paralaxInstance;
	this.update = updateFunction;
	this.realRadius = radius;

	this.left = function () {
		var b = this.instance.b;
		var a = this.instance.a;
		var width = this.instance.canvasWidth;
		var height = this.instance.canvasHeight;

		var leftY = this.findY(this.x, this.y, this.z);

		var thetaL = Math.atan((a + this.x) / (this.z + b));
		var leftX = (width / 2) + (Math.tan(thetaL) * b);

		return new Coordinate(leftX, leftY);
	}

	this.right = function () {
		var b = this.instance.b;
		var a = this.instance.a;
		var width = this.instance.canvasWidth;
		var height = this.instance.canvasHeight;

		var thetaL = Math.atan((this.x - a) / (this.z + b));
		var rightX = (width / 2) + (Math.tan(thetaL) * b);

		var rightY = this.findY(this.x, this.y, this.z);

		return new Coordinate(rightX, rightY);
	}

	this.findY = function(x, y, z) {
		var b = this.instance.b;
		var a = this.instance.a;
		var width = this.instance.canvasWidth;
		var height = this.instance.canvasHeight;

		var thetaV = Math.atan(this.y / (this.z + b));
		var newY = (width / 2) - (b * Math.tan(thetaV));

		return newY;
	}

	this.radius = function() {
		return this.findY(this.x, this.y - this.realRadius, this.z) - this.findY(this.x, this.y, this.z);
	}
}

function Coordinate(x, y) {
	this.x = x;
	this.y = y;
}
