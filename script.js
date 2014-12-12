var p;
var shape;
var mouse = {};

$(document).mousemove(function( event ) {
	mouse.x = event.pageX;
	mouse.y = event.pageY;
});

document.onkeydown = reactKey;

function reactKey(evt) {
	if(evt.keyCode == 40) {
		shape.z -= 10;
	} else if (evt.keyCode == 38) {
		shape.z += 10;
	} else if (evt.keyCode == 37) {
		shape.x -= 10;
	} else if (evt.keyCode == 39) {
		shape.x += 10;
	}
}

function goFullScreen(){
	document.getElementById('button').style.display="none";

	var wrapper = document.getElementById('wrap');

	canvasHeight = screen.height;
	canvasWidth = window.innerWidth/2;

	wrapper.height = screen.height;
	wrapper.width = window.innerWidth;

	var canvas = document.getElementById("left");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	canvas = document.getElementById("right");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	if(wrapper.requestFullScreen) {
		wrapper.requestFullScreen();
	} else if(wrapper.webkitRequestFullScreen) {
		wrapper.webkitRequestFullScreen();
	} else if(wrapper.mozRequestFullScreen) {
		wrapper.mozRequestFullScreen();
	}

	p = new Paralax('left', 'right');

	p.shapes.push(new Sphere(0, 0, 0, function(count) {
		this.x = 300*Math.cos(count);
		this.y = 300*Math.cos(count);
		this.z = 500 + 300*Math.sin(count);
	}, p));
	p.shapes.push(new Sphere(0, 0, 0, function(count) {
		this.x = 300*Math.cos(count);
		this.y = -300*Math.cos(count);
		this.z = 500 + 300*Math.sin(count);
	}, p));
	p.shapes.push(new Sphere(0, 0, 0, function(count) {
		this.x = -300*Math.cos(count);
		this.y = 300*Math.cos(count);
		this.z = 500 - 300*Math.sin(count);
	}, p));
	p.shapes.push(new Sphere(0, 0, 0, function(count) {
		this.x = -300*Math.cos(count);
		this.y = -300*Math.cos(count);
		this.z = 500 - 300*Math.sin(count);
	}, p));
	shape = new Sphere(0, 0, 500, function(count) {}, p);
	p.shapes.push(new Sphere(0, 0, 0, function(count) {
		this.x = mouse.x;
		this.y = mouse.y;
		this.z = 500 - 300*Math.sin(count);
	}, p));
	p.shapes.push(shape);
}
