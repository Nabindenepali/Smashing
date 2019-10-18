/**
 * A class template to create paddles
 * @param id - id of the dom element
 * @param x - x cordinate of the paddle
 * @param minX - minimum possible value of x
 * @param maxX - maximum possible value of x
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
  };

  /**
   * Function for initial release of the ball
   * @param ball
   */
  this.releaseBall = function(ball) {
    if (ball.getXCenter() < _x || ball.getXCenter() > _x + 100) {
      ball.setVelocity({x: 0, y: -3});
    } else {
      ball.setVelocity({x: 3, y: 3});
    }
  };

  /**
   * Function to check collision between paddle and ball
   * @param ball
   */
  this.strikesBall = function(ball) {
    return ball.getXCenter() > _x && ball.getXCenter() < _x + 100 && ball.getY() === 11;
  };
}

/**
 * Create a new paddle with desired properties and render
 */
paddle = new Paddle('paddle', 451, 1, 901, 10);
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

/**
 * A class template to create bricks
 * @param id - id of the dom element
 * @constructor
 */
function Brick(id) {
  const _element = document.getElementById(id);

  /**
   * Function to simulate the smash of the break
   */
  this.smash = function() {
    _element.style.visibility = 'hidden';
  }
}

/**
 * Add bricks of size 10*10
 */
bricks = addBricks(10, 10);

/**
 * Create new brick instances by associating with dom elements
 * @param m - horizontal dimensions
 * @param n - vertical dimensions
 */
function addBricks(m, n) {
  const bricks = [];
  for (let i = 0; i < m; i++) {
    const bricksInTheRow = [];
    for (let j = 0; j < n; j++) {
      bricksInTheRow.push(new Brick('brick-' + i.toString() + j.toString()));
    }
    bricks.push(bricksInTheRow);
  }
  return bricks;
}

/**
 * A class template to create balls
 * @param id - id of the dom element
 * @param x - x cordinate of the ball
 * @param y - y cordinate of the ball
 * @param minX - minimum possible value of x
 * @param maxX - maximum possible value of x
 * @param minY - minimum possible value of y
 * @param maxY - maximum possible value of y
 * @param velocity - movement vector for the movement of the ball
 * @constructor
 */
function Ball(id, x, y, minX, maxX, minY, maxY, velocity) {
  const _element = document.getElementById(id);
  let _x = x;
  let _y = y;
  const _minX = minX;
  const _maxX = maxX;
  const _minY = minY;
  const _maxY = maxY;
  let _velocity = velocity;

  /**
   * Function to move the ball within the container
   */
  this.move = function() {
    _x += _velocity.x;
    if (_x < _minX) { // Prevent move to the left if the ball is already on the left edge
      _x = _minX;
      _velocity.x = -_velocity.x;
    }
    if (_x > _maxX) { // Prevent move to the right if the ball is already on the right edge
      _x = _maxX;
      _velocity.x = -_velocity.x;
    }
    _y += _velocity.y;
    if (_y < _minY) { // Hide the ball if it moves to the floor
      _element.style.display = 'none';
    }
    if (_y > _maxY) { // Prevent move to the bottom if the ball is already on the top edge
      _y = _maxY;
      _velocity.y = -_velocity.y;
    }
  };

  /**
   * Change velocity to simulate reflection along y-axis
   */
  this.reflectY = function() {
    _velocity.y = -_velocity.y;
  };

  /**
   * Function to render paddle
   */
  this.render = function() {
    _element.style.left = _x + 'px';
    _element.style.bottom = _y + 'px';
  };

  /**
   * Get x cordinates of the center of the ball
   */
  this.getXCenter = function() {
    return _x + 10;
  };

  /**
   * Get y cordinates of the bottom of the ball
   */
  this.getY = function() {
    return _y;
  };

  /**
   * Function to set velocity of the ball
   */
  this.setVelocity = function(velocity) {
    _velocity = velocity;
  };

  /***
   * Check if the ball has already dropped on the floor
   */
  this.dropped = function() {
    return _y < 1;
  }
}

/**
 * Create a new ball with desired properties and render
 */
ball = new Ball('ball', 491, 11, 1, 981, 1, 581, {x: 0, y: 0});
ball.render();

/**
 * Strike the ball and compute velocity when space is pressed
 */
document.addEventListener('keypress', function(e) {
  if (e.key === ' ') {
    game();
  }
});

/***
 * Main logic of the game runs here
 */
function game() {
  paddle.releaseBall(ball);
  const intervalId = setInterval(function() {
    ball.move();
    ball.render();
    if (paddle.strikesBall(ball)) {
      ball.reflectY();
    }
    if (ball.dropped()) {
      clearInterval(intervalId);
    }
  }, 10);
}


