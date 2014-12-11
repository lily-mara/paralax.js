function goFullScreen(){
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

	document.getElementById('button').style.display="none";

	if(wrapper.requestFullScreen)
		wrapper.requestFullScreen();
	else if(wrapper.webkitRequestFullScreen)
		wrapper.webkitRequestFullScreen();
	else if(wrapper.mozRequestFullScreen)
		wrapper.mozRequestFullScreen();

	//BEGIN MAIN SCRIPT
	start();
}
