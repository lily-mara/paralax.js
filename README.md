paralax.js - Parallax for the Browser
===

paralax.js is a javascript library that allows for dead simple parallax vision applications in the browser using canvas elements.

Getting Started
---

The first thing you need to do is create at least two canvas elements in your html

```html
<div id="wrap">
	<canvas id="left" style="background: #FFFFFF; border: 1px solid black;" role="img">
		Your browser does not support the canvas element.
	</canvas>
	<canvas id="right" style="background: #FFFFFF; border: 1px solid black;" role="img">
		Your browser does not support the canvas element.
	</canvas>
</div>
```

Next, you create a new instance of paralax and pass in the ids of those two canvases, and start adding your shapes

```javascript
var p = new Paralax('left', 'right');
p.shapes.push(new Sphere(0, 0, 0, function(i) {
	this.x = 300*Math.cos(i);
	this.y = 300*Math.cos(i);
	this.z = 300*Math.cos(i);
}, p));
```
