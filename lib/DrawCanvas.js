
import Friend from './Friend';

// Local WindowAnimationTiming interface
window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;

/**
 * Utilizes the given canvas to draw a config.FRIEND_COUNT of Confetti Ribbons and Papers onto it.
 *
 * NOTE:
 * Applies a onresize function to the window called "window.resizeConfetti." Once finished
 * with the DrawCanvas function remove the "window.resizeConfetti" from the resize listener.
 *
 * @param  {CanvasRenderingContext2D} canvas What to draw on.
 */
export default function (canvas, config) {

	let canvasHappyPlace = {

		canvasParent: canvas.parentNode,
		canvasWidth: canvas.parentNode.offsetWidth,
		canvasHeight: canvas.parentNode.offsetHeight,
		context: canvas.getContext('2d'),
		interval: null,
		friends: [],

		/**
		 * Resizes the canvas according to the current width and height of the usable window.
		 */
		resize() {

			this.canvasWidth = this.canvasParent.offsetWidth;
			this.canvasHeight = this.canvasParent.offsetHeight;
			canvas.width = this.canvasWidth;
			canvas.height = this.canvasHeight;
			// Paper.bounds = new Vector2D(this.canvasWidth, this.canvasHeight);
			// Ribbon.bounds = new Vector2D(this.canvasWidth, this.canvasHeight);
		},

		/**
		 * Sets up the size of the canvas, creates the Confetti Papers and Ribbons, cancels
		 * any current animation frames and starts the update process.
		 */
		start() {

			this.resize();

			let maxDimension = Math.min(this.canvasWidth, this.canvasHeight);
			for (let x = 0; x < config.FRIEND_COUNT; x++) {
				let fx = (maxDimension / 2) + (0.4 * maxDimension * Math.cos((2 * Math.PI) * x / config.FRIEND_COUNT));
				let fy = (maxDimension / 2) + (0.4 * maxDimension * Math.sin((2 * Math.PI) * x / config.FRIEND_COUNT));
				this.friends.push(new Friend(fx, fy));
			}

			for (let k = 0; k < config.FRIEND_COUNT * 3.2; k++) {
		    let a = Math.floor(Math.random() * config.FRIEND_COUNT);
		    let b = Math.floor(a + Math.random() * 22) % config.FRIEND_COUNT;

		    if (a != b) {
		      this.friends[a].connectTo(this.friends[b]);
		      this.friends[b].connectTo(this.friends[a]);
		    }
		  }

			this.stop();
			this.update();
		},

		/**
		 * Clears the entire canvas, updates the Confetti Ribbons and Papers, draws them onto
		 * the canvas and then sets the next animation frame to call this function.
		 */
		update() {

			this.friends.map((friend) => {
		    friend.move();
		  });

		  this.friends.map((friend) => {
		    friend.expose(this.context);
		    friend.exposeConnections(this.context);
		  });

		  if (Date.now() % 2 == 0) 
		  	this.friends.map((friend) => {
			    friend.findHappyPlace(this.friends);
			  });

			this.interval = window.requestAnimationFrame(() => canvasHappyPlace.update());
		},

		stop() {

			window.cancelAnimationFrame(this.interval);
		}
	};

	canvasHappyPlace.start();
	window.resizeConfetti = () => canvasHappyPlace.resize();
	window.addEventListener('resize', window.resizeConfetti);
}
