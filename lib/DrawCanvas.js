
import Friend from './Friend';

// Local WindowAnimationTiming interface
window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;

/**
 * Utilizes the given canvas to draw a config.FRIEND_COUNT amount of friends with a config.PAINTER_COUNT
 * amount of SandPainters on the the canvas..
 *
 * NOTE:
 * Applies a onresize function to the window called "window.resizeHappyPlace." Once finished
 * with the DrawCanvas function remove the "window.resizeHappyPlace" from the resize listener.
 *
 * @param  {CanvasRenderingContext2D} canvas What to draw on.
 * @param  {object}                   config Basic configuration information to setup the happy 
 *                                           place friends.
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
		},

		/**
		 * Sets up the size of the canvas, creates the friends and their circular positions
		 * to each other and makes sure that they have some initial friendships.
		 */
		start() {

			this.resize();

			let maxDimension = Math.min(this.canvasWidth, this.canvasHeight);
			for (let x = 0; x < config.FRIEND_COUNT; x++) {
				let fx = (maxDimension / 2) + (0.4 * maxDimension * Math.cos((2 * Math.PI) * x / config.FRIEND_COUNT));
				let fy = (maxDimension / 2) + (0.4 * maxDimension * Math.sin((2 * Math.PI) * x / config.FRIEND_COUNT));
				this.friends.push(new Friend(fx, fy, config));
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
		 * Updates the position of the current friends and draws their new position and
		 * newly desired happy place.
		 */
		update() {

			this.friends.map((friend) => {
		    friend.update(this.friends);
		    friend.draw(this.context)
		  });

			this.interval = window.requestAnimationFrame(() => canvasHappyPlace.update());
		},

		stop() {

			window.cancelAnimationFrame(this.interval);
		}
	};

	canvasHappyPlace.start();
	window.resizeHappyPlace = () => canvasHappyPlace.resize();
	window.addEventListener('resize', window.resizeHappyPlace);
}
