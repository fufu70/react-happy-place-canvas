
import SandPainter from './SandPainter';
import randomColor from 'randomcolor';

const PAINTER_COUNT = 3;

/**
 * 
 */
export default function Friend(x, y) {

  let color = randomColor();
  let connectionLength = 1 + parseInt(Math.random() * 50);
  // console.log(connectionLength);
  let sandPainters = [];

  for (let i = 0; i < PAINTER_COUNT; i ++) {
    sandPainters.push(new SandPainter());
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
     * [expose description]
     * @param  {[type]} canvas [description]
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
     * @param  {[type]} canvas [description]
     * @return {[type]}        [description]
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
     * [exposeConnections description]
     * @param  {[type]} canvas [description]
     * @return {[type]}        [description]
     */
    move() {
      // add velocity to position
      this.x += this.vx;
      this.y += this.vy;

      //friction
      this.vx *= 0.99;
      this.vy *= 0.99;
    },

    /**
     * [exposeConnections description]
     * @param  {[type]} canvas [description]
     * @return {[type]}        [description]
     */
    connectTo(newFriend) {
      if (!this.friendOf(newFriend))
        this.myFriends.push(newFriend);
    },

    /**
     * [exposeConnections description]
     * @param  {[type]} canvas [description]
     * @return {[type]}        [description]
     */
    friendOf(friend) {
      return this.myFriends.indexOf(friend) !== -1;
    },

    /**
     * [exposeConnections description]
     * @param  {[type]} canvas [description]
     * @return {[type]}        [description]
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
