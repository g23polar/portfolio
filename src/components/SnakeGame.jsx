import { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const CELL_SIZE = 20;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const CANVAS_WIDTH = CELL_SIZE * GRID_WIDTH;
const CANVAS_HEIGHT = CELL_SIZE * GRID_HEIGHT;
const INITIAL_SPEED = 120;

function getColors(theme) {
  const isDark = theme === 'dark';
  return {
    bg: isDark ? '#1c1c1c' : '#fafafa',
    grid: isDark ? '#2a2a2a' : '#e8e8e8',
    snake: isDark ? '#b8f2e6' : '#5e6472',
    snakeHead: isDark ? '#00BFFF' : '#1a73e8',
    food: '#ff6b6b',
    text: isDark ? '#b8f2e6' : '#5e6472',
    border: isDark ? '#b8f2e6' : '#aed9e0',
  };
}

function spawnFood(snake) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
    };
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

function drawGame(canvas, snake, food, colors) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= GRID_WIDTH; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL_SIZE, 0);
    ctx.lineTo(x * CELL_SIZE, CANVAS_HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y <= GRID_HEIGHT; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL_SIZE);
    ctx.lineTo(CANVAS_WIDTH, y * CELL_SIZE);
    ctx.stroke();
  }

  if (food) {
    ctx.fillStyle = colors.food;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  snake.forEach((seg, i) => {
    const isHead = i === 0;
    ctx.fillStyle = isHead ? colors.snakeHead : colors.snake;
    const padding = isHead ? 1 : 2;
    ctx.fillRect(
      seg.x * CELL_SIZE + padding,
      seg.y * CELL_SIZE + padding,
      CELL_SIZE - padding * 2,
      CELL_SIZE - padding * 2
    );
  });
}

function SnakeGame({ onClose, theme }) {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const stateRef = useRef({
    snake: [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }],
    food: null,
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
  });

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const colors = getColors(theme);

  // Initial draw
  useEffect(() => {
    const s = stateRef.current;
    if (!s.food) {
      s.food = spawnFood(s.snake);
    }
    drawGame(canvasRef.current, s.snake, s.food, getColors(theme));
  }, [theme]);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.snake = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
    s.direction = { x: 1, y: 0 };
    s.nextDirection = { x: 1, y: 0 };
    s.score = 0;
    s.food = spawnFood(s.snake);

    setScore(0);
    setGameOver(false);
    setStarted(true);

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);

    gameLoopRef.current = setInterval(() => {
      const st = stateRef.current;
      st.direction = st.nextDirection;
      const head = st.snake[0];
      const newHead = { x: head.x + st.direction.x, y: head.y + st.direction.y };

      if (
        newHead.x < 0 || newHead.x >= GRID_WIDTH ||
        newHead.y < 0 || newHead.y >= GRID_HEIGHT ||
        st.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...st.snake];

      if (st.food && newHead.x === st.food.x && newHead.y === st.food.y) {
        st.score += 10;
        setScore(st.score);
        st.food = spawnFood(newSnake);
      } else {
        newSnake.pop();
      }

      st.snake = newSnake;
      drawGame(canvasRef.current, st.snake, st.food, getColors(theme));
    }, INITIAL_SPEED);
  }, [theme]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      const s = stateRef.current;
      const dir = s.direction;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (dir.y !== 1) s.nextDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
          if (dir.y !== -1) s.nextDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
          if (dir.x !== 1) s.nextDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
          if (dir.x !== -1) s.nextDirection = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        animation: 'snakeFadeIn 0.2s ease-out',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes snakeFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes snakeScaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <div
        className="relative rounded-2xl p-6"
        style={{
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
          boxShadow: `0 0 40px ${isDark ? 'rgba(184,242,230,0.15)' : 'rgba(174,217,224,0.3)'}`,
          animation: 'snakeScaleIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>
              Snake
            </h2>
            <p className="text-xs opacity-60" style={{ color: colors.text }}>
              You found the easter egg!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-mono font-bold" style={{ color: colors.snakeHead }}>
              {score}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: colors.text }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.grid}` }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="block"
          />

          {(!started || gameOver) && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ backgroundColor: `${colors.bg}dd` }}
            >
              <p className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                {gameOver ? 'Game Over' : 'Snake'}
              </p>
              {gameOver && (
                <p className="text-lg font-mono mb-4" style={{ color: colors.snakeHead }}>
                  Score: {score}
                </p>
              )}
              <button
                onClick={startGame}
                className="px-6 py-2 rounded-xl font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.snakeHead,
                  color: colors.bg,
                }}
              >
                {gameOver ? 'Play Again' : 'Start Game'}
              </button>
              <p className="text-xs mt-3 opacity-50" style={{ color: colors.text }}>
                Arrow keys or WASD to move
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;
