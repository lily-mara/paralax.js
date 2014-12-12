var p;

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

	//BEGIN MAIN SCRIPT
	p = new Paralax('left', 'right');
	p.shapes.push(new Sphere(0, 0, 0, function(count) {
		this.x = 300*Math.cos(count);
		this.y = 300*Math.cos(count);
		this.z = 500 + 300*Math.sin(count);
	}, p));
}
