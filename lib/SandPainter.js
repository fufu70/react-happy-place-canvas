
import randomColor from 'randomcolor';

const MAX_PAINTER = 0.22;

/**
 * Draws a falling Square on a canvas.
 */
export default function SandPainter() {

  let painter = Math.random();
  let sweepLevel = 0.01 + (Math.random() * 0.09);
  let color = randomColor();

  return {
    painter: painter,
    sweepLevel: sweepLevel,
    color: color,

    /**
     * Draws the sand on the given canvas.
     *
     * @param {CanvasRenderingContext2D} canvas What to draw on.
     * @param  {[type]} x      [description]
     * @param  {[type]} y      [description]
     * @param  {[type]} ax     [description]
     * @param  {[type]} ay     [description]
     * @return {[type]}        [description]
     */
    draw(canvas, x, y, ax, ay) {
      canvas.fillStyle = this.color + (28).toString(16);
      canvas.fillRect(ax + (x-ax) * Math.sin(painter), ay + (y-ay) * Math.sin(painter), 1, 1);

      this.painter += (Math.random() * 0.05) - 0.05;
      this.painter = Math.min(Math.max(-MAX_PAINTER, this.painter), MAX_PAINTER);

      let painterWeight = this.painter / 10;

      for (let i = 0; i < 11; i ++) {
        const opacity = 0.1 - (i / 110);
        canvas.fillStyle = this.color + (opacity * 256).toString(16);
        canvas.fillRect(
          ax + (x - ax) * Math.sin(painter + Math.sin(i * painterWeight)), 
          ay + (y - ay) * Math.sin(painter + Math.sin(i * painterWeight)),
          1, 1
        );
        canvas.fillRect(
          ax + (x - ax) * Math.sin(painter + Math.sin(i * painterWeight)), 
          ay + (y - ay) * Math.sin(painter + Math.sin(i * painterWeight)),
          1, 1
        );
      }

      canvas.fill();
    }
  };
}
