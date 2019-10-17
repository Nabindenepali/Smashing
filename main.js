/**
 * A constructor to create paddle
 * @param id - id of the dom element
 * @param x - x cordinate of the paddle
 * @param minX - minimum possible value of x
 * @param maxX - maximum possible value of y
 * @param speed - speed of the paddle movement
 * @constructor
 */
function Paddle(id, x, minX, maxX, speed) {
  const _element = document.getElementById(id);
  let _x = x;
  const _y = 1;
  const _minX = minX;
  const _maxX = maxX;
  const _speed = speed;

  /**
   * Function to move paddle to the left
   */
  this.moveLeft = function() {
    _x -= _speed;
    if (_x < _minX) { // Prevent move to the left if the paddle is already on the left edge
      _x = _minX;
    }
  };

  /**
   * Function to move paddle to the right
   */
  this.moveRight = function() {
    _x += _speed;
    if (_x > _maxX) { // Prevent move to the right if the paddle is already on the right edge
      _x = _maxX;
    }
  };

  /**
   * Function to render paddle
   */
  this.render = function() {
    _element.style.left = _x + 'px';
    _element.style.bottom = _y + 'px';
  }
}

/**
 * Create a new paddle with desired properties and render
 */
paddle = new Paddle('paddle', 1, 1, 901, 10);
paddle.render();

/**
 * Move paddle to the left or right based on the arrow key pressed
 */
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') {
    paddle.moveRight();
  }
  if (e.key === 'ArrowLeft') {
    paddle.moveLeft();
  }
  paddle.render();
});