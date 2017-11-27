
import SandPainter from './SandPainter';
import randomColor from 'randomcolor';

export default function Friend(x, y, config) {

  let color = randomColor({ hue: config.COLOR });
  let connectionLength = 1 + parseInt(Math.random() * 50);
  // console.log(connectionLength);
  let sandPainters = [];

  for (let i = 0; i < config.PAINTER_COUNT; i ++) {
    sandPainters.push(new SandPainter(config));
  }

  return {
    x: x,
    y: y,
    dx: x,
    dy: y,
    vx: 0,
    vy: 0,
    connectionCount: 0,
    myFriends: [],
    sandPainters: sandPainters,

    /**
     * Updates the position of the friend and tries to determine where
     * to move next depending on its happy place.
     * 
     * @param  {array} allFriends All friends in the current environment.
     */
    update(allFriends) {

      this.move();

      if (Date.now() % 2 == 0) 
        this.findHappyPlace(allFriends);
    },

    /**
     * Draws the current friend and all of its friendships.
     * 
     * @param {CanvasRenderingContext2D} canvas What to draw on.
     */
    draw(canvas) {
      this.expose(canvas);
      this.exposeConnections(canvas);
    },

    /**
     * Draws the friends current position as a couple of black and white pixels.
     * 
     * @param {CanvasRenderingContext2D} canvas What to draw on.
     */
    expose(canvas) {
      for (let dx = - 2; dx < 3; dx++) {
        let a = 0.5 - Math.abs(dx) / 5.0;
        canvas.fillStyle = '#000000' + (256 * a).toString(16);
        canvas.fillRect(this.x + dx, this.y, 1, 1);
        canvas.fillStyle = '#ffffff' + (256 * a).toString(16);
        canvas.fillRect(this.x + dx - 1, this.y - 1, 1, 1);
      }
      for (let dy = -2; dy < 3; dy++) {
        let a = 0.5 - Math.abs(dy) / 5.0;
        canvas.fillStyle = '#000000' + (256 * a).toString(16);
        canvas.fillRect(x, y + dy, 1, 1);
        canvas.fillStyle = '#ffffff' + (256 * a).toString(16);
        canvas.fillRect(x - 1, y+ dy - 1, 1, 1);
      }
    },

    /**
     * [exposeConnections description]
     * 
     * @param {CanvasRenderingContext2D} canvas What to draw on.
     */
    exposeConnections(canvas) {
      // draw connection lines to all friends
      this.myFriends.map((friend) => {
        this.sandPainters.map((sandPainter) => {
          sandPainter.draw(canvas, this.x, this.y, friend.x, friend.y);
        })
      })
    },

    /**
     * Adds the current velocity on to the position of the friend and applies a bit
     * of friction to it so that it slows down over time.
     */
    move() {
      // add velocity to position
      this.x += this.vx;
      this.y += this.vy;

      //friction
      this.vx *= config.FRICTION;
      this.vy *= config.FRICTION;
    },

    /**
     * Attempts to create a new friendship.s
     * 
     * @param  {Friend}  newFriend New or existing friendship.
     */
    connectTo(newFriend) {
      if (!this.friendOf(newFriend))
        this.myFriends.push(newFriend);
    },

    /**
     * Checks to see that the friendship has already been created.
     * 
     * @param  {Friend}  friend New or existing friendship.
     * @return {boolean}        If the friendship already exists.
     */
    friendOf(friend) {
      return this.myFriends.indexOf(friend) !== -1;
    },

    /**
     * Attempts to find the happy place by determing the current friend, and
     * rival positions and then moves towards or away from them respectively.
     * 
     * @param  {array} allFriends All friends in the current environment.
     */
    findHappyPlace(allFriends) {
      // set destination to a happier place
      // (closer to friends, further from others)
      let averageX = 0.0;
      let averageY = 0.0;

      // find mean average of all friends and non-friends
      allFriends.map((friend) => {
        if (friend != this) {
          // find distance
          let ddx = friend.x - this.x;
          let ddy = friend.y - this.y;
          let distance = Math.sqrt(ddx * ddx + ddy * ddy);
          let t = Math.atan2(ddy, ddx);

          if (this.myFriends.indexOf(friend) !== -1) {
            // attract
            if (distance > connectionLength) {
              averageX += 4.0 * Math.cos(t);
              averageY += 4.0 * Math.sin(t);
            }
          } else {
            // repulse
            if (distance < connectionLength) {
              averageX += (connectionLength - distance) * Math.cos(t + Math.PI);
              averageY += (connectionLength - distance) * Math.sin(t + Math.PI);
            }
          }
        }
      });

      // console.log(averageX, averageY);

      this.vx += averageX / 42.22;
      this.vy += averageY / 42.22;
    }
  }
}
