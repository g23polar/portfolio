import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ThemeContext } from '../App';

const CELL_SIZE = 20;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const CANVAS_WIDTH = CELL_SIZE * GRID_WIDTH;
const CANVAS_HEIGHT = CELL_SIZE * GRID_HEIGHT;
const INITIAL_SPEED = 120;

function SnakeGame({ onClose }) {
  const { theme } = useContext(ThemeContext);
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const directionRef = useRef({ x: 1, y: 0 });
  const nextDirectionRef = useRef({ x: 1, y: 0 });
  const snakeRef = useRef([{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }]);
  const foodRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const scoreRef = useRef(0);

  const isDark = theme === 'dark';
  const colors = {
    bg: isDark ? '#1c1c1c' : '#fafafa',
    grid: isDark ? '#2a2a2a' : '#e8e8e8',
    snake: isDark ? '#b8f2e6' : '#5e6472',
    snakeHead: isDark ? '#00BFFF' : '#1a73e8',
    food: '#ff6b6b',
    text: isDark ? '#b8f2e6' : '#5e6472',
    border: isDark ? '#b8f2e6' : '#aed9e0',
  };

  const spawnFood = useCallback(() => {
    const snake = snakeRef.current;
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
    } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
    foodRef.current = pos;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const snake = snakeRef.current;
    const food = foodRef.current;

    // Background
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid
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

    // Food
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

    // Snake
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? colors.snakeHead : colors.snake;
      const padding = isHead ? 1 : 2;
      const radius = isHead ? 4 : 3;
      const x = seg.x * CELL_SIZE + padding;
      const y = seg.y * CELL_SIZE + padding;
      const size = CELL_SIZE - padding * 2;
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, radius);
      ctx.fill();
    });
  }, [colors]);

  const tick = useCallback(() => {
    const snake = snakeRef.current;
    directionRef.current = nextDirectionRef.current;
    const dir = directionRef.current;
    const head = snake[0];
    const newHead = { x: head.x + dir.x, y: head.y + dir.y };

    // Wall collision
    if (newHead.x < 0 || newHead.x >= GRID_WIDTH || newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
      setGameOver(true);
      return;
    }

    // Self collision
    if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Eat food
    const food = foodRef.current;
    if (food && newHead.x === food.x && newHead.y === food.y) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      spawnFood();
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    draw();
  }, [draw, spawnFood]);

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setStarted(true);
    spawnFood();
    draw();

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(tick, INITIAL_SPEED);
  }, [draw, tick, spawnFood]);

  useEffect(() => {
    if (!started) {
      spawnFood();
      draw();
    }
  }, [started, draw, spawnFood]);

  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (!started || gameOver) {
        if (e.key === ' ' || e.key === 'Enter') {
          startGame();
        }
        return;
      }

      const dir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (dir.y !== 1) nextDirectionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
          if (dir.y !== -1) nextDirectionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
          if (dir.x !== 1) nextDirectionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
          if (dir.x !== -1) nextDirectionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [started, gameOver, startGame]);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  // Stop game loop on game over
  useEffect(() => {
    if (gameOver && gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, [gameOver]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative rounded-2xl p-6"
        style={{
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
          boxShadow: `0 0 40px ${isDark ? 'rgba(184,242,230,0.15)' : 'rgba(174,217,224,0.3)'}`,
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

          {/* Start / Game Over overlay */}
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
      </motion.div>
    </motion.div>
  );
}

export default SnakeGame;
