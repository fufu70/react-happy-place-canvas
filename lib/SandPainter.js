
import randomColor from 'randomcolor';

const MAX_PAINTER = 0.22;

/**
 * Draws a falling Square on a canvas.
 */
export default function SandPainter(config) {

  let painter = Math.random();
  let sweepLevel = 0.01 + (Math.random() * 0.09);
  let color = randomColor({ hue: config.COLOR });

  return {
    painter: painter,
    sweepLevel: sweepLevel,
    color: color,

    /**
     * Draws the sand on the given canvas.
     *
     * @param {CanvasRenderingContext2D} canvas   What to draw on.
     * @param {number}                   x        The x to start at on the canvas.
     * @param {number}                   y        The y to start at on the canvas.
     * @param {number}                   attractX The attraction x point to draw towards.
     * @param {number}                   attractY The attraction y point to draw towards.
     */
    draw(canvas, x, y, attractX, attractY) {
      canvas.fillStyle = this.color + (28).toString(16);
      canvas.fillRect(
        attractX + (x - attractX) * Math.sin(painter), 
        attractY + (y - attractY) * Math.sin(painter), 
        1, 
        1
      );

      this.painter += (Math.random() * 0.05) - 0.05;
      this.painter = Math.min(Math.max(-MAX_PAINTER, this.painter), MAX_PAINTER);

      let painterWeight = this.painter / 10;

      for (let i = 0; i < 11; i ++) {
        const opacity = 0.1 - (i / 110);
        canvas.fillStyle = this.color + (opacity * 256).toString(16);
        canvas.fillRect(
          attractX + (x - attractX) * Math.sin(painter + Math.sin(i * painterWeight)), 
          attractY + (y - attractY) * Math.sin(painter + Math.sin(i * painterWeight)),
          1, 1
        );
        canvas.fillRect(
          attractX + (x - attractX) * Math.sin(painter + Math.sin(i * painterWeight)), 
          attractY + (y - attractY) * Math.sin(painter + Math.sin(i * painterWeight)),
          1, 1
        );
      }

      canvas.fill();
    }
  };
}
